import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'
import up from '../../images/icon/up.png'
import down from '../../images/icon/down.png'

export default class BookImages extends Component{
  config = {
    navigationBarTitleText: "阅读",
    onReachBottomDistance: '100'
  }

  componentWillMount(){
    let id = this.$router.params.id;
    let preId = this.$router.params.pre;
    let nextId = this.$router.params.next;
    this.setState({
      preId,
      nextId
    });
    Taro.showLoading({
      title: '正在加载...',
    })
    this.getImageById(id);
  }
  getImageById(id){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_page_detail?id=' + id,
      method: 'get',
      success: (res)=>{
        Taro.hideLoading();
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
  pre(){
    let id = this.state.preId;
    if(id){
      Taro.showLoading({
        title: '正在为你跳转上一页',
      });
      this.getImageById(id);
    }else{
      Taro.showToast({
        title: '已经是第一页了',
        icon: 'success',
        duration: 1000
      });
    }
  }

  next(){
    let id = this.state.nextId;
    if(id){
      Taro.showLoading({
        title: '正在为你跳转上一页',
      });
      this.getImageById(id)
    }else{
      Taro.showToast({
        title: '已经是最后一页了',
        icon: 'success',
        duration: 1000
      });
    }
  }

  getMoreImage(){
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
        <ScrollView className='all-image' scrollY='true' lowerThreshold='50' onScrollTolower={this.getMoreImage}>
          {
            this.state.imagesShowList.length !== 0 ? this.state.imagesShowList.map((item, index)=>{
              return item === '内容结束' ? <View className='end'>本话内容结束</View> :
                <Image mode='widthFix' className='book-detail-image' src={item} key={index}/>

            }) : <View className='no-data'>暂无数据</View>
          }
        </ScrollView>
        <View className='pre' onClick={this.pre}>
          <Image src={up} className='btn-icon'/>
          上一话
        </View>
        <View className='next' onClick={this.next}>
          <Image src={down} className='btn-icon' />
          下一话
        </View>
      </View>
    )
  }
}
