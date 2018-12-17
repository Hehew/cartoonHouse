import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

export default class BookItem extends Component{
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }
  toDetail(){
    Taro.navigateTo({
      url: '../bookdetail/index?id=1'
    })
  }
  render(){
    return(
      <View className={this.props.className} style={this.props.className === 'no-margin-left' ? {marginLeft: 0} : {}}>
        <Image className='book-item-image' src={this.props.imageSrc} onClick={this.toDetail} />
        <View className='book-info'>
          <View>
            <Text className='book-title'>{this.props.bookTitle}</Text>
          </View>
          <View>
            {
              this.props.describes.map((item, index)=>{
                return <Text key='index' className='book-label'>{item}</Text>
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
