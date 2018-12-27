import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import BookItem from '../item/index';
import { connect } from '@tarojs/redux'
import './index.scss'

@connect((state)=>({
    ...state
}))
class MoreBook extends Component{
  config = {
    navigationBarTitleText: "全部",
    onReachBottomDistance: '100'
  }

  state = {
    dataList: [],
    isIfind: false
  }

  componentWillMount(){
    let keyword = this.$router.params.keyword
    if(keyword){
      this.setState({
        isIfind: true
      });
      Taro.showLoading({
        title: '正在加载...',
      });
      this.getDataList(keyword, 1);
    }else{
      this.setState({
        dataList: this.props.pageslist.pages_list.slice(0, 10),
        page_max_num: Math.ceil(this.props.pageslist.pages_list.length / 10),
        isIfind: false,
        current_page: 1
      })
    }
  }

  getDataList(keyword, page_num){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/search_for_keyword?keyword=' + keyword + '&page_num=' + page_num,
      method: 'get',
      success: (res)=>{
        Taro.hideLoading();
        this.setState({
          dataList: this.state.dataList.concat(res.data.data),
          page_max_num: res.data.page_max_num || 1,
          current_page: page_num
        })
      }
    })
  }

  onReachBottom(){
    if(this.state.isIfind){
      let keyword = this.$router.params.keyword
      if(this.state.current_page < this.state.page_max_num){
        this.getDataList(keyword, this.state.current_page + 1);
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
    }else{
      let current_page = this.state.current_page;
      let page_max_num = this.state.page_max_num;
      let length = this.props.pageslist.length;
      if(current_page < page_max_num){
        if(current_page === page_max_num - 1){
          this.setState({
            dataList: this.state.dataList.concat(this.props.pageslist.pages_list.slice(current_page * 10, length)),
            current_page: current_page + 1
          })
        }else{
          this.setState({
            dataList: this.state.dataList.concat(this.props.pageslist.pages_list.slice(current_page * 10, current_page * 10 + 10)),
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
  }

  render(){
    return(
      <View style={{paddingTop: '5rpx'}}>
        {
          this.state.dataList.length !== 0 ?
          this.state.dataList.map((item, index)=>{
            return item === '加载完成' ? <View className='end'>---我是有底线的---</View> : <BookItem className={index % 3 === 0 ? 'book-item no-margin-left' : 'book-item'}
                             imageSrc={item.imageSrc}
                             describes={item.label && item.label.split('/').slice(0, 3)}
                             bookTitle={item.title && item.title.length > 5 ? item.title.substr(0, 5) + '...' : item.title}
                             key={index}
                             pageUrl={item.detail_url}/>
          }) : <View className='no-data'>暂无数据</View>
        }
      </View>
    )
  }
}

export default MoreBook
