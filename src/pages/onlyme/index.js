import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import title from '../../images/myimages/dujiashoufa.png'
import BookItem from '../item'
import { connect } from '@tarojs/redux'
import {replace, setPageDetail} from '../../actions/pages_list'

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
class OnlyMe extends Component{
  config = {
    navigationBarTitleText: "独家"
  }

  state = {
    data: []
  }
  componentWillMount () {
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

  toDetail(event){
    let {setPageDetail} = this.props;
    let item = {
      title: this.state.data[0].title,
      imageSrc: this.state.data[0].imageSrc,
      describes: this.state.data[0].label.split('/'),
      detail_url: this.state.data[0].detail_url
    }
    setPageDetail(item);
    Taro.navigateTo({
      url: '../bookdetail/index?detail_url=' + event.currentTarget.dataset.pageUrl + '&coverUrl=' + event.currentTarget.dataset.coverUrl
    })
  }

  toMore(){
    let { replace } = this.props;
    replace(this.state.data);
    Taro.navigateTo({
      url: '../morebook/index'
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
          {/*<Image onClick={this.toDetail} dataCoverUrl={this.state.data[0].imageSrc} dataPageUrl={this.state.data[0].detail_url} src={this.state.data[0].imageSrc} className='image-main' />*/}
          {/*<View style={{paddingLeft: '20rpx', paddingBottom: '10rpx' }}>*/}
            {/*<View>*/}
              {/*<Text className='book-main-title'>{this.state.data[0].title}</Text>*/}
            {/*</View>*/}
            {/*<View>*/}
              {/*<Text className='sub-title'>{this.state.data[0].label}</Text>*/}
            {/*</View>*/}
          {/*</View>*/}
          <View>
            {
              this.state.data.slice(0, 12).map((item, index)=>{
                return <BookItem key={index}
                                 className={index % 3 === 0 ? 'book-item no-margin-left' : 'book-item'}
                                 pageUrl={item.detail_url}
                                 imageSrc={item.imageSrc}
                                 describes={item.label && item.label.split('/').slice(0, 3)}
                                 bookTitle={item.title && item.title.length > 5 ? item.title.substr(0, 5) + '...' : item.title} />
              })
            }
          </View>
        </View>
      </View>
    )
  }
}

export default OnlyMe
