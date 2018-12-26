import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import BookItem from '../item/index';
import './index.scss'

export default class MyCollection extends Component{
  config = {
    navigationBarTitleText: "收藏",
    onReachBottomDistance: '100'
  }

  state = {
    dataList: []
  }

  componentDidShow(){
    let pagesAllList = Taro.getStorageSync('marks');
    this.setState({
      dataList: pagesAllList.slice(0, 10),
      page_max_num: Math.ceil(pagesAllList.length / 10),
      pagesAllList: pagesAllList,
      current_page: 1
    })
  }

  onReachBottom(){
    let current_page = this.state.current_page;
    let page_max_num = this.state.page_max_num;
    let length = this.state.pagesAllList.length;
    if(current_page < page_max_num){
      if(current_page === page_max_num - 1){
        this.setState({
          dataList: this.state.dataList.concat(this.state.pagesAllList.slice(current_page * 10, length)),
          current_page: current_page + 1
        })
      }else{
        this.setState({
          dataList: this.state.dataList.concat(this.state.pagesAllList.slice(current_page * 10, current_page * 10 + 10)),
          current_page: current_page + 1
        })
      }
    }else{
      let dataList = this.state.dataList;
      if(dataList[dataList.length - 1] === '加载完成'){
        return;
      }
      dataList.push('加载完成');
      this.setState({
        dataList: dataList
      })
    }
  }

  render(){
    return(
      <View style={{paddingTop: '5rpx'}}>
        {
          this.state.dataList.length !== 0 ?
            this.state.dataList.map((item, index)=>{
              return item === '加载完成' ? <View className='end'>---我是有底线的---</View> : <BookItem className={index % 3 === 0 ? 'book-item no-margin-left' : 'book-item'}
                               imageSrc={item.imageSrc}
                               describes={item.describes && item.describes.slice(0, 3)}
                               bookTitle={item.title && item.title.length > 5 ? item.title.substr(0, 5) + '...' : item.title}
                               key={index}
                               pageUrl={item.detail_url}/>
            }) : <View className='no-data'>暂无数据</View>
        }
      </View>
    )
  }
}

