import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import './index.scss'
import flush from '../../images/myimages/flush.png'

export default class Ifind extends Component{
  state = {
    hostList: []
  }
  config = {
    navigationBarTitleText: "搜索"
  }

  componentDidShow(){
    this.getHotList();
  }
  getHotList(){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/hot_list',
      method: 'get',
      success: (res)=>{
        this.setState({
          hostList: res.data
        })
      }
    })
  }
  render(){
    return(
      <View>
        <View style={{borderBottom: '5rpx solid #e3e3e7',paddingTop: '10px'}}>
          <Input cursor='5' placeholderClass='placeholder' className='search-condition' placeholder='输入您想查找的漫画' confirmType='search' />
          <Text className='search-btn'>搜索</Text>
        </View>
        <View>
          <View className='clearfix' style={{paddingLeft: '30rpx'}}>
            <Text className='hot-search'>热门搜索</Text>
            <Image className='flush-image' src={flush} />
          </View>
          <View style={{paddingLeft: '15rpx'}}>
            {
              this.state.hostList.slice(0, 20).map((item, index)=>{
                return <View key={index}
                             pageUrl={item.detail_url}
                             className='to-book-detail'>{item.title}</View>
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
