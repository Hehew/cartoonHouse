import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { add, minus, asyncAdd } from '../../actions/counter'

import './index.scss'
import Tuijian from '../../images/myimages/tuijian.png'
import BookItem from '../item'

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
  state = {
    data: []
  }

  config = {
    navigationBarTitleText: '本周'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () {

  }

  componentDidShow () {
   this.getCurrentWeekData()
  }

  getCurrentWeekData(){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/current_week',
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
          {
            this.state.data.slice(0, 6).map((item, index)=>{
              return <BookItem key={index}
                               pageUrl={item.detail_url}
                               className={index % 2 === 0 ?  'book-item-bg no-margin-left' : 'book-item-bg'}
                               imageSrc={item.imageSrc}
                               describes={item.label.split('/')}
                               bookTitle={item.title}/>
            })

          }
        </View>
      </View>
    )
  }
}

export default CurrentWeek
