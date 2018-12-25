import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Button} from '@tarojs/components'
import './index.scss'
import page_num from '../../images/myimages/page_num.png';
import select from '../../images/myimages/select.png';
import Mark from '../../images/icon/mark.png'
import Nomark from '../../images/icon/nomark.png'
import { connect } from '@tarojs/redux';

@connect((state)=>{
  return {
    ...state
  }
})
class BookDetail extends Component{
  state = {
    pageSelect: false,
    pageList: [],
    pageSelectList: [],
    pageSelectShowList: [],
    markIds: []
  }
  config = {
    navigationBarTitleText: "详情"
  }

  componentWillMount(){
    let detail_url = this.$router.params.detail_url;
    let coverUrl = this.$router.params.coverUrl;
    this.setState({
      coverUrl
    });
    this.setState({
      markIds: Taro.getStorageSync('markIds') || []
    });
    this.getPageDetail(detail_url)
  }

  getPageDetail(url){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_info?detail_url=' + url,
      method: 'get',
      success: (res)=>{
        let max_page_num = Math.ceil(res.data.length / 10);
        this.setState({
          pageList: res.data,
          pageSelectList: res.data,
          current_page: 1,
          max_page_num,
          pageSelectShowList: res.data.slice(0, 10),
          myid: url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
        })
      }
    })
  }

  selectPageList(event){
    let item = event.currentTarget.dataset.value
    let indexes;
    if(item){
      indexes = item.split('-')
      let pageSelectList = this.state.pageList.slice(indexes[0] - 1, indexes[1]);
      let max_page_num = Math.ceil(pageSelectList.length / 10);
      this.setState({
        pageSelectList,
        pageSelectShowList: pageSelectList.slice(0, 10),
        current_page: 1,
        max_page_num,
        pageSelect: false
      })
    }else{
      let max_page_num = Math.ceil(this.state.pageList.length / 10);
      this.setState({
        pageSelectList: this.state.pageList,
        pageSelectShowList: this.state.pageList.slice(0, 10),
        current_page: 1,
        max_page_num,
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

  cancelMark(){
    const marks = Taro.getStorageSync('marks');
    const markIds = this.state.markIds;
    const index = markIds.indexOf(this.state.myid);
    markIds.splice(index, 1)
    marks.splice(index, 1)
    Taro.setStorageSync('marks', marks);
    Taro.setStorageSync('markIds', markIds);
    this.setState({
      markIds: markIds
    })
    Taro.showToast({
      title: '取消收藏',
      icon: 'success',
      duration: 1000
    });
  }

  mark(){
    const marks = Taro.getStorageSync('marks');
    const markIds = this.state.markIds;
    if(marks){
      let currentDetail = this.props.pageslist.pageDetail;
      marks.push(currentDetail);
      markIds.push(this.state.myid)
      Taro.setStorageSync('marks', marks);
      Taro.setStorageSync('markIds', markIds);
      this.setState({
        markIds: markIds
      })
    }else{
      Taro.setStorageSync('marks', [this.props.pageslist.pageDetail]);
      Taro.setStorageSync('markIds', [this.state.myid]);
      this.setState({
        markIds: [this.state.myid]
      })
    }
    Taro.showToast({
      title: '收藏成功',
      icon: 'success',
      duration: 1000
    });
  }

  getMoreDetail(){
    let current_page = this.state.current_page;
    let page_max_num = this.state.max_page_num;
    let length = this.state.pageSelectList.length;
    if(current_page < page_max_num){
      if(current_page === page_max_num - 1){
        this.setState({
          pageSelectShowList: this.state.pageSelectShowList.concat(this.state.pageSelectList.slice(current_page * 10, length)),
          current_page: current_page + 1
        })
      }else{
        this.setState({
          pageSelectShowList: this.state.pageSelectShowList.concat(this.state.pageSelectList.slice(current_page * 10, current_page * 10 + 10)),
          current_page: current_page + 1
        })
      }
    }else{
      let pageSelectShowList = this.state.pageSelectShowList;
      if(pageSelectShowList[pageSelectShowList.length - 1] === '加载完成'){
        return;
      }
      pageSelectShowList.push('加载完成');
      this.setState({
        pageSelectShowList: pageSelectShowList
      })
    }
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
          {
            this.state.markIds.indexOf(this.state.myid) === -1 ?
              <Image src={Nomark} className='mark' onClick={this.mark}/>:
              <Image src={ Mark } className='mark' onClick={this.cancelMark}/>

          }
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
        <ScrollView className='all-page' scrollY='true' lowerThreshold='50' onScrollTolower={this.getMoreDetail}>
          {
            this.state.pageSelectShowList.map((item, index)=>{
              return  item === '加载完成' ? <View className='end'>加载完成</View> :
                <View dataPageId={item.page_id} onClick={this.ToReadPage} className='book-item-one-page' key={index}>
                  <Image src={this.state.coverUrl} className='book-item-main-image' />
                  <View className='page-info'>
                    <View className='page-num'>
                      <Text>{item.title && item.title.substring(0, item.title.length -11)}</Text>
                    </View>
                    <View className='page-time clearfix'>
                      <Text className='vt'>{item.title && item.title.substring(item.title.length - 11)}</Text>
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

export default BookDetail

