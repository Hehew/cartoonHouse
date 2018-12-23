import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'
import main from '../../images/myimages/main.png'
import Zan from '../../images/myimages/zan.png';
import select from '../../images/myimages/select.png';

export default class BookDetail extends Component{
  state = {
    pageSelect: false,
    pageList: []
  }
  config = {
    navigationBarTitleText: "详情"
  }

  componentWillMount(){
    let detail_url = this.$router.params.detail_url
    this.getPageDetail(detail_url)
  }

  getPageDetail(url){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_info?detail_url=' + url,
      method: 'get',
      success: (res)=>{
        this.setState({
          pageList: res.data
        })
      }
    })
  }

  changePageSelect(){
    this.setState({
      pageSelect: !this.state.pageSelect
    });
  }
  render() {
    let getPageSet = ()=>{
      let setNum;
      let length = this.state.pageList.length;
      if(length % 50 === 0){
        setNum = Math.floor(length / 50);
      }else{
        setNum = Math.floor(length / 50) + 1;
      }
      let pageSet = [];
      for(let i = 0; i < setNum;i++){
        pageSet.push(i === (setNum -1) ? ((i * 50 + 1) + '-' + length) : ((i * 50 + 1) + '-' + (i * 50)))
      }
      return pageSet;
    }

    return (
      <View className='container'>
        <View className='select-page-container clearfix'>
          <View className='select-page-main' onClick={this.changePageSelect}>
            <Text className='select-page'>选集</Text>
            <Image src={select} className='select-image' />
          </View>
        </View>
        { this.state.pageSelect ?
          <View className='page-all-set'>
            {
              getPageSet().map((item, index)=>{
                return <View className='page-set' key={index}>{item}</View>
              })
            }
          </View> : ''
        }
        <ScrollView className='all-page' scrollY='true' >
          <View className='book-item-one-page'>
            <Image src={main} className='book-item-main-image' />
            <View className='page-info'>
              <View className='page-num'>
                <Text>第01话 激战过后</Text>
              </View>
              <View className='page-time clearfix'>
                <Text className='vt'>03-21</Text>
                <View className='fr like'>
                  <Image src={Zan} className='little-image vt' />
                  <Text className='vt'>21134</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='book-item-one-page'>
            <Image src={main} className='book-item-main-image' />
            <View className='page-info'>
              <View className='page-num'>
                <Text>第01话 激战过后</Text>
              </View>
              <View className='page-time clearfix'>
                <Text className='vt'>03-21</Text>
                <View className='fr like'>
                  <Image src={Zan} className='little-image vt' />
                  <Text className='vt'>21134</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='book-item-one-page'>
            <Image src={main} className='book-item-main-image' />
            <View className='page-info'>
              <View className='page-num'>
                <Text>第01话 激战过后</Text>
              </View>
              <View className='page-time clearfix'>
                <Text className='vt'>03-21</Text>
                <View className='fr like'>
                  <Image src={Zan} className='little-image vt' />
                  <Text className='vt'>21134</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='book-item-one-page'>
            <Image src={main} className='book-item-main-image' />
            <View className='page-info'>
              <View className='page-num'>
                <Text>第01话 激战过后</Text>
              </View>
              <View className='page-time clearfix'>
                <Text className='vt'>03-21</Text>
                <View className='fr like'>
                  <Image src={Zan} className='little-image vt' />
                  <Text className='vt'>21134</Text>
                </View>
              </View>
            </View>
          </View>
          <View className='book-item-one-page'>
            <Image src={main} className='book-item-main-image' />
            <View className='page-info'>
              <View className='page-num'>
                <Text>第01话 激战过后</Text>
              </View>
              <View className='page-time clearfix'>
                <Text className='vt'>03-21</Text>
                <View className='fr like'>
                  <Image src={Zan} className='little-image vt' />
                  <Text className='vt'>21134</Text>
                </View>
              </View>
            </View>
          </View><View className='book-item-one-page'>
          <Image src={main} className='book-item-main-image' />
          <View className='page-info'>
            <View className='page-num'>
              <Text>第01话 激战过后</Text>
            </View>
            <View className='page-time clearfix'>
              <Text className='vt'>03-21</Text>
              <View className='fr like'>
                <Image src={Zan} className='little-image vt' />
                <Text className='vt'>21134</Text>
              </View>
            </View>
          </View>
        </View><View className='book-item-one-page'>
          <Image src={main} className='book-item-main-image' />
          <View className='page-info'>
            <View className='page-num'>
              <Text>第01话 激战过后</Text>
            </View>
            <View className='page-time clearfix'>
              <Text className='vt'>03-21</Text>
              <View className='fr like'>
                <Image src={Zan} className='little-image vt' />
                <Text className='vt'>21134</Text>
              </View>
            </View>
          </View>
        </View><View className='book-item-one-page'>
          <Image src={main} className='book-item-main-image' />
          <View className='page-info'>
            <View className='page-num'>
              <Text>第01话 激战过后</Text>
            </View>
            <View className='page-time clearfix'>
              <Text className='vt'>03-21</Text>
              <View className='fr like'>
                <Image src={Zan} className='little-image vt' />
                <Text className='vt'>21134</Text>
              </View>
            </View>
          </View>
        </View><View className='book-item-one-page'>
          <Image src={main} className='book-item-main-image' />
          <View className='page-info'>
            <View className='page-num'>
              <Text>第01话 激战过后</Text>
            </View>
            <View className='page-time clearfix'>
              <Text className='vt'>03-21</Text>
              <View className='fr like'>
                <Image src={Zan} className='little-image vt' />
                <Text className='vt'>21134</Text>
              </View>
            </View>
          </View>
        </View><View className='book-item-one-page'>
          <Image src={main} className='book-item-main-image' />
          <View className='page-info'>
            <View className='page-num'>
              <Text>第01话 激战过后</Text>
            </View>
            <View className='page-time clearfix'>
              <Text className='vt'>03-21</Text>
              <View className='fr like'>
                <Image src={Zan} className='little-image vt' />
                <Text className='vt'>21134</Text>
              </View>
            </View>
          </View>
        </View><View className='book-item-one-page'>
          <Image src={main} className='book-item-main-image' />
          <View className='page-info'>
            <View className='page-num'>
              <Text>第01话 激战过后</Text>
            </View>
            <View className='page-time clearfix'>
              <Text className='vt'>03-21</Text>
              <View className='fr like'>
                <Image src={Zan} className='little-image vt' />
                <Text className='vt'>21134</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <Button className='start-read'>
        开始阅读
      </Button>
    </View>
    )
  }
}
