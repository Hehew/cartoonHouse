import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'
import main from '../../images/myimages/main.png'
import page_num from '../../images/myimages/page_num.png';
import select from '../../images/myimages/select.png';

export default class BookDetail extends Component{
  state = {
    pageSelect: false,
    pageList: [],
    pageSelectList: []
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
          pageList: res.data,
          pageSelectList: res.data
        })
      }
    })
  }

  selectPageList(event){
    let item = event.currentTarget.dataset.value
    let indexes;
    if(item){
      indexes = item.split('-')
      this.setState({
        pageSelectList: this.state.pageList.slice(indexes[0] - 1, indexes[1]),
        pageSelect: false
      })
    }else{
      this.setState({
        pageSelectList: this.state.pageList,
        pageSelect: false
      })
    }
  }

  changePageSelect(){
    this.setState({
      pageSelect: !this.state.pageSelect
    });
  }

  ToReadPage(event){
    let id = event.currentTarget.dataset.pageId;
    Taro.navigateTo({
      url: '../bookimages/index?id=' + id
    })
  }

  beginRead(){
    let id = this.state.pageSelectList[0].page_id;
    Taro.navigateTo({
      url: '../bookimages/index?id=' + id
    })
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
      let pageSet = [''];
      for(let i = 0; i < setNum;i++){
        pageSet.push(i === (setNum -1) ? ((i * 50 + 1) + '-' + length) : ((i * 50 + 1) + '-' + ((i + 1) * 50)))
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
                return <View dataValue={item} className='page-set' key={index} onClick={this.selectPageList}>{item || '全部'}</View>
              })
            }
          </View> : ''
        }
        <ScrollView className='all-page' scrollY='true' >
          {
            this.state.pageSelectList.map((item, index)=>{
              return  <View dataPageId={item.page_id} onClick={this.ToReadPage} className='book-item-one-page' key={index}>
                <Image src={main} className='book-item-main-image' />
                <View className='page-info'>
                  <View className='page-num'>
                    <Text>{item.title}</Text>
                  </View>
                  <View className='page-time clearfix'>
                    <Text className='vt'>03-21</Text>
                    <View className='fr like'>
                      <Image src={page_num} className='little-image vt' />
                      <Text className='vt'>{item.image_num}</Text>
                    </View>
                  </View>
                </View>
              </View>
            })
          }
      </ScrollView>
      <Button className='start-read' onClick={this.beginRead}>
        开始阅读
      </Button>
    </View>
    )
  }
}
