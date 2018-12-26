import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'

export default class BookImages extends Component{
  config = {
    navigationBarTitleText: "阅读",
    onReachBottomDistance: '100'
  }

  componentWillMount(){
    let id = this.$router.params.id;
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_page_detail?id=' + id,
      method: 'get',
      success: (res)=>{
        let max_page_num = Math.ceil(res.data.length / 3);
        this.setState({
          imagesList: res.data,
          imagesShowList: res.data.slice(0, 3),
          max_page_num,
          current_page: 1,

        });
      }
    })
  }

  onReachBottom(){
    let current_page = this.state.current_page;
    let page_max_num = this.state.max_page_num;
    let length = this.state.imagesList.length;
    if(current_page < page_max_num){
      if(current_page === page_max_num - 1){
        this.setState({
          imagesShowList: this.state.imagesShowList.concat(this.state.imagesList.slice(current_page * 3, length)),
          current_page: current_page + 1
        })
      }else{
        this.setState({
          imagesShowList: this.state.imagesShowList.concat(this.state.imagesList.slice(current_page * 3, current_page * 3 + 3)),
          current_page: current_page + 1
        })
      }
    }else{
      let imagesShowList = this.state.imagesShowList;
      if(imagesShowList[imagesShowList.length - 1] === '内容结束'){
        return;
      }
      imagesShowList.push('内容结束');
      this.setState({
        imagesShowList: imagesShowList
      })
    }
  }

  render(){
    return(
      <View>
        {
          this.state.imagesShowList.length !== 0 ? this.state.imagesShowList.map((item, index)=>{
            return item === '内容结束' ? <View className='end'>本话内容结束</View> :
              <Image mode='widthFix' className='book-detail-image' src={item} key={index}/>

          }) : <View className='no-data'>暂无数据</View>
        }
      </View>
    )
  }
}
