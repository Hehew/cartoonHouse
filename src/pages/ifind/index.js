import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image, Input } from '@tarojs/components'
import './index.scss'
import flush from '../../images/myimages/flush.png'

export default class Ifind extends Component{
  config = {

  }

  render(){
    return(
      <View>
        <View style={{borderBottom: '5rpx solid #e3e3e7'}}>
          <Input cursor='5' placeholderClass='placeholder' className='search-condition' placeholder='输入您想查找的漫画' confirmType='search' />
          <Text className='search-btn'>搜索</Text>
        </View>
        <View>
          <View className='clearfix' style={{paddingLeft: '30rpx'}}>
            <Text className='hot-search'>热门搜索</Text>
            <Image className='flush-image' src={flush} />
          </View>
          <View style={{paddingLeft: '15rpx'}}>
            <View className='to-book-detail'>人体碎片</View>
            <View className='to-book-detail'>牛书供应商</View>
            <View className='to-book-detail'>傲世九重天</View>
            <View className='to-book-detail'>天价萌妹</View>
            <View className='to-book-detail'>原来我很爱你</View>
          </View>
        </View>
      </View>
    )
  }
}
