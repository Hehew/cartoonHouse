import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import title from '../../images/myimages/dujiashoufa.png'
import BookItem from '../item'
import image0 from '../../images/myimages/0.png'
import image1 from '../../images/myimages/1.png'
import image2 from '../../images/myimages/2.png'
import image3 from '../../images/myimages/3.png'

export default class OnlyMe extends Component{
  config = {
    navigationBarTitleText: "独家"
  }

  state = {
    data: [{}]
  }
  componentDidShow () {
    this.getOnlyMeData()
  }
  getOnlyMeData(){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/only_me',
      method: 'get',
      success: (res)=>{
        this.setState({
          data: res.data
        })
      }
    })
  }

  toMore(){
    Taro.navigateTo({
      url: '../morebook/index?id=1'
    })
  }

  render(){
    return(
      <View>
        <View style={{paddingRight: '25rpx', height: '84rpx'}}>
          <Image className='bookcity-title' src={title} />
          <Text className='more' onClick={this.toMore}>更多 &gt;</Text>
        </View>
        <View>
          <Image pageUrl={this.state.data[0].detail_url} src={this.state.data[0].imageSrc} className='image-main' />
          <View style={{paddingLeft: '20rpx', paddingBottom: '10rpx' }}>
            <View>
              <Text className='book-main-title'>{this.state.data[0].title}</Text>
            </View>
            <View>
              <Text className='sub-title'>{this.state.data[0].label}</Text>
            </View>
          </View>
          <View>
            {
              this.state.data.slice(1, 7).map((item, index)=>{
                return <BookItem key={index}
                                 className={index % 3 === 0 ? 'book-item no-margin-left' : 'book-item'}
                                 imageSrc={item.imageSrc}
                                 describes={item.label.split('/')}
                                 bookTitle={item.title} />
              })
            }
          </View>
        </View>
      </View>
    )
  }
}
