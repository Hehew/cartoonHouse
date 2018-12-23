import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'
import Tuijian from '../../images/myimages/tuijian.png'
import BookItem from '../item'
import c1 from '../../images/myimages/c1.png'
import c2 from '../../images/myimages/c2.png'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))
class CurrentWeek extends Component {

  config = {
    navigationBarTitleText: '本周'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {

  }

  componentDidShow () {
    Taro.request({
      url: 'http://www.hew.ac.cn:8080/bg/current_week',
      method: 'get',
      success: (res)=>{
        this.setState({
          data: res.data
        })
      }
    })
  }

  componentDidHide () { }

  toMore(){
    Taro.navigateTo({
      url: '../morebook/index?id=1'
    })
  }

  render () {
    return (
      <View>
        <View style={{paddingRight: '25rpx',height: '84rpx'}}>
          <Image src={Tuijian} className='current-week-title' />
          <Text className='more' onClick={this.toMore}>更多 &gt;</Text>
        </View>
        <View>
          <BookItem className='book-item-bg no-margin-left' imageSrc={c1} describes={['听说这个系列的男主都开挂了']} bookTitle='斗罗大陆' />
          <BookItem className='book-item-bg' imageSrc={c2} describes={['神秘面具竟招来桃花运']} bookTitle='都市花丛逍遥游' />
        </View>
        {this.state.data}
      </View>
    )
  }
}

export default CurrentWeek
