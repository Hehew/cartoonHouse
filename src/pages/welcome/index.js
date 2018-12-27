import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, OpenData, Button } from '@tarojs/components'
import './index.scss'

export default  class OnlyMe extends Component{
  config = {
    "navigationBarBackgroundColor": "#b3d4db"
  }
  onTap(){
    Taro.switchTab({
      url: '../currentweek/index'
    })
  }
  render(){
    return(<View className='container'>
      <OpenData type='userAvatarUrl' className='avatar'></OpenData>
      <View className='user-name'>
        <text>你好 ! </text>
        <OpenData type='userNickName' className='user-name'></OpenData>
      </View>
      <Button className='moto' onClick={this.onTap}>
        开启小程序之旅
      </Button>
    </View>)
  }
}
