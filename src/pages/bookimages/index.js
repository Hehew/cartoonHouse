import Taro, { Component } from '@tarojs/taro'
import { View, Image, ScrollView} from '@tarojs/components'
import './index.scss'
import { connect } from '@tarojs/redux';
import up from '../../images/icon/up.png'
import down from '../../images/icon/down.png'

@connect((state)=>{
  return {
    ...state
  }
})
class BookImages extends Component{
  config = {
    navigationBarTitleText: "阅读",
    onReachBottomDistance: '100'
  }

  state = {
    scrollTop: 0
  }

  componentWillMount(){
    let id = this.$router.params.id;
    let preId = this.$router.params.pre;
    let nextId = this.$router.params.next;
    this.setState({
      id,
      preId,
      nextId
    });
    Taro.showLoading({
      title: '正在加载...',
    });
    this.getImageById(id);
  }
  getImageById(id){
    this.setState({
      scrollTop: 0
    })
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_page_detail?id=' + id,
      method: 'get',
      success: (res)=>{
        this.setPageNum();
        Taro.hideLoading();
        let max_page_num = Math.ceil(res.data.length / 3);
        this.setState({
          imagesList: res.data,
          imagesShowList: res.data.slice(0, 3),
          max_page_num,
          current_page: 1
        });

      }
    })
  }

  setPageNum(){
    let id = this.state.id;
    let ids = this.props.pageslist.pageDetailIds;
    let index = ids.indexOf(id);
    let preId;
    let nextId;
    if(ids.length === 1){
      nextId = '';
      preId = '';
    }else{
      if(index === 0){
        preId = '';
        nextId = ids[index + 1];
      }else if (index === ids.length - 1){
        preId = ids[index - 1];
        nextId = '';
      }else{
        nextId = ids[index + 1];
        preId = ids[index - 1];
      }
    }
    this.setState({
      preId,
      nextId
    })
  }
  pre(){
    let id = this.state.preId;
    if(id){
      this.setWhereIRead(-1);
      Taro.showLoading({
        title: '正在为你跳转上一页',
      });
      this.setState({
        id
      })
      this.getImageById(id);
    }else{
      Taro.showToast({
        title: '已经是第一页了',
        icon: 'success',
        duration: 1000
      });
    }
  }

  next(){
    let id = this.state.nextId;
    if(id){
      this.setWhereIRead(1);
      Taro.showLoading({
        title: '正在为你跳转下一页',
      });
      this.setState({
        id
      });
      this.getImageById(id)
    }else{
      Taro.showToast({
        title: '已经是最后一页了',
        icon: 'success',
        duration: 1000
      });
    }
  }

  setWhereIRead(addparam){
    let marks = Taro.getStorageSync('marks');
    const index = this.$router.params.pageIndex;
    if(index != -1){
      marks[index]['iReadPageIndex'] = addparam + marks[index]['iReadPageIndex'];
      Taro.setStorageSync('marks', marks);
    }
  }

  // scrollTopBeBlank(event){
  //   this.setState({
  //     scrollTop: event.detail.scrollTop
  //   })
  // }
  getMoreImage(){
    let current_page = this.state.current_page;
    let page_max_num = this.state.max_page_num;
    let length = this.state.imagesList.length;
    if(current_page < page_max_num){
      if(current_page === page_max_num - 1){
        this.setState({
          imagesShowList: this.state.imagesShowList.concat(this.state.imagesList.slice(current_page * 3, length)),
          current_page: current_page + 1
        })
      }else{
        this.setState({
          imagesShowList: this.state.imagesShowList.concat(this.state.imagesList.slice(current_page * 3, current_page * 3 + 3)),
          current_page: current_page + 1
        })
      }
    }else{
      let imagesShowList = this.state.imagesShowList;
      if(imagesShowList[imagesShowList.length - 1] === '内容结束'){
        return;
      }
      imagesShowList.push('内容结束');
      this.setState({
        imagesShowList: imagesShowList
      })
    }
  }

  render(){
    return(
      <View>
        <ScrollView className='all-image' scrollTop={this.state.scrollTop} scrollY='true' scrollWithAnimation='true' lowerThreshold='50'  onScrollTolower={this.getMoreImage}>
          {
            this.state.imagesShowList.length !== 0 ? this.state.imagesShowList.map((item, index)=>{
              return item === '内容结束' ? <View className='end'>本话内容结束</View> :
                <Image mode='widthFix' className='book-detail-image' src={item} key={index} />

            }) : <View className='no-data'>暂无数据</View>
          }
        </ScrollView>
        <View className='pre' onClick={this.pre}>
          <Image src={up} className='btn-icon' />
          上一话
        </View>
        <View className='next' onClick={this.next}>
          <Image src={down} className='btn-icon' />
          下一话
        </View>
      </View>
    )
  }
}

export default BookImages
