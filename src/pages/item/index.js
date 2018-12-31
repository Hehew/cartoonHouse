import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import {replace, setPageDetail} from "../../actions/pages_list";
import { connect } from '@tarojs/redux'

@connect((state)=>{
  return {
    ...state
  }
}, (dispatch) => ({
  replace(value){
    dispatch(replace(value));
  },
  setPageDetail(value){
    dispatch(setPageDetail(value))
  }
}))
class BookItem extends Component{
  componentWillReceiveProps (nextProps) {
    // console.log(this.props, nextProps)
  }
  toDetail(event){
    let {setPageDetail} = this.props;
    let item = {
      title: this.props.bookTitle,
      imageSrc: this.props.imageSrc,
      describes: this.props.describes,
      detail_url: this.props.pageUrl
    }
    setPageDetail(item);
    Taro.navigateTo({
      url: '../bookdetail/index?detail_url=' + this.props.pageUrl + '&coverUrl=' + event.currentTarget.dataset.coverUrl
    })
  }
  render(){
    return(
      <View className={this.props.className} style={this.props.className === 'no-margin-left' ? {marginLeft: 0} : {}}>
        <Image mode='widthFix' className='book-item-image' src={this.props.imageSrc} dataCoverUrl={this.props.imageSrc} onClick={this.toDetail} />
        <View className='book-info'>
          <View>
            <Text className='book-title'>{this.props.bookTitle}</Text>
          </View>
          <View>
            {
              this.props.describes.map((item, index)=>{
                return <Text key={index} className='book-label'>{item}</Text>
              })
            }
          </View>
        </View>
      </View>
    );
  }
}
export default BookItem
