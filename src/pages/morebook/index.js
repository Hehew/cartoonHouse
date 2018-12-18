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

  render(){
    return(
      <View style={{paddingTop: '10rpx'}}>
        <BookItem className='book-item no-margin-left' imageSrc={image1} describes={['休仙', '少年', '热血']} bookTitle='最强神兽系统' />
        <BookItem className='book-item' imageSrc={image2} describes={['少年', '热血', '玄幻']} bookTitle='封鬼传说' />
        <BookItem className='book-item' imageSrc={image3} describes={['奇幻']} bookTitle='天生外卖员' />
        <BookItem className='book-item no-margin-left' imageSrc={image1} describes={['休仙', '少年', '热血']} bookTitle='最强神兽系统' />
        <BookItem className='book-item' imageSrc={image2} describes={['少年', '热血', '玄幻']} bookTitle='封鬼传说' />
        <BookItem className='book-item' imageSrc={image3} describes={['奇幻']} bookTitle='天生外卖员' />
        <BookItem className='book-item no-margin-left' imageSrc={image1} describes={['休仙', '少年', '热血']} bookTitle='最强神兽系统' />
        <BookItem className='book-item' imageSrc={image2} describes={['少年', '热血', '玄幻']} bookTitle='封鬼传说' />
        <BookItem className='book-item' imageSrc={image3} describes={['奇幻']} bookTitle='天生外卖员' />
        <BookItem className='book-item no-margin-left' imageSrc={image1} describes={['休仙', '少年', '热血']} bookTitle='最强神兽系统' />
        <BookItem className='book-item' imageSrc={image2} describes={['少年', '热血', '玄幻']} bookTitle='封鬼传说' />
        <BookItem className='book-item' imageSrc={image3} describes={['奇幻']} bookTitle='天生外卖员' />
      </View>
    )
  }
}
