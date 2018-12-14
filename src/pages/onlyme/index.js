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

  }

  render(){
    return(
      <View>
        <View style={{paddingRight: '25rpx', height: '84rpx'}}>
          <Image className='bookcity-title' src={title} />
          <Text className='more'>更多 &gt;</Text>
        </View>
        <View>
          <Image src={image0} className='image-main' />
          <View style={{paddingLeft: '20rpx', paddingBottom: '10rpx' }}>
            <View>
              <Text className='book-main-title'>星辰变</Text>
            </View>
            <View>
              <Text className='sub-title'>光芒中羽化成神仙</Text>
            </View>
          </View>
          <View>
            <BookItem className='book-item no-margin-left' imageSrc={image1} describes={['休仙', '少年', '热血']} bookTitle='最强神兽系统' />
            <BookItem className='book-item' imageSrc={image2} describes={['少年', '热血', '玄幻']} bookTitle='封鬼传说' />
            <BookItem className='book-item' imageSrc={image3} describes={['奇幻']} bookTitle='天生外卖员' />
          </View>
        </View>
      </View>
    )
  }
}
