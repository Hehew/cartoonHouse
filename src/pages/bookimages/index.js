import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'

export default class BookImages extends Component{
  config = {
    navigationBarTitleText: "阅读"
  }

  componentWillMount(){
    let id = this.$router.params.id;
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_page_detail?id=' + id,
      method: 'get',
      success: (res)=>{
        this.setState({
          imagesList: res.data
        })
      }
    })
  }

  render(){
    return(
      <View>
        {
          this.state.imagesList.map((item, index)=>{
            return <Image className='book-detail-image' src={item} key={index}/>
          })
        }
      </View>
    )
  }
}
