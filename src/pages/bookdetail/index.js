import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'
import main from '../../images/myimages/main.png'
import Zan from '../../images/myimages/zan.png';
import select from '../../images/myimages/select.png';

export default class BookDetail extends Component{
  state = {
    pageSelect: false
  }
  config = {
    navigationBarTitleText: "详情"
  }
  changePageSelect(){
    this.setState({
      pageSelect: !this.state.pageSelect
    });
  }
  render() {
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
            <View className='page-set'>1-50</View>
            <View className='page-set'>51-100</View>
            <View className='page-set'>51-100</View>
            <View className='page-set'>51-100</View>
            <View className='page-set'>51-100</View>
            <View className='page-set'>51-100</View>
            <View className='page-set'>51-100</View>
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
