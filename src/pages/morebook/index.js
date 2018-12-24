import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import BookItem from '../item/index';
import image1 from '../../images/myimages/1.png'
import image2 from '../../images/myimages/2.png'
import image3 from '../../images/myimages/3.png'
import './index.scss'

export default class MoreBook extends Component{
  config = {
    navigationBarTitleText: "全部"
  }

  state = {
    dataList: []
  }

  componentWillMount(){
    let keyword = this.$router.params.keyword
    if(keyword){
      Taro.request({
        url: 'https://www.hew.ac.cn/bg/search_for_keyword?keyword=' + keyword,
        method: 'get',
        success: (res)=>{
          this.setState({
            dataList: res.data
          })
        }
      })
    }
  }

  render(){
    return(
      <View style={{paddingTop: '10rpx'}}>
        {
          this.state.dataList.map((item, index)=>{
            return <BookItem className={index % 3 === 0 ? 'book-item no-margin-left' : 'book-item'}
                             imageSrc={item.imageSrc}
                             describes={item.label.split('/').slice(0, 3)}
                             bookTitle={item.title.length > 5 ? item.title.substr(0, 5) + '...' : item.title}
                             key={index}
                             pageUrl={item.detail_url}/>
          })
        }
      </View>
    )
  }
}
