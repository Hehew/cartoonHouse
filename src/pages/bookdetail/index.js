import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'
import main from '../../images/myimages/main.png'
import Zan from '../../images/myimages/zan.png';

export default class BookDetail extends Component{
  config = {

  }

  render() {
    return (
      <View className='container'>
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
