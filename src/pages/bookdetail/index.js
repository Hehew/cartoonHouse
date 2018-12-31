import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, ScrollView, Swiper, SwiperItem} from '@tarojs/components'
import './index.scss'
import page_num from '../../images/myimages/page_num.png';
import select from '../../images/myimages/select.png';
import { connect } from '@tarojs/redux';
import redStar from '../../images/icon/red-start.png'
import read from '../../images/icon/read.png'
import { setPageDetailIds } from '../../actions/pages_list'

@connect((state)=>{
  return {
    ...state,
    isSetTopScroll: false
  }
},(dispatch) => ({
  setPageDetailIds: (value)=>{
    dispatch(setPageDetailIds(value))
  }
}))
class BookDetail extends Component{
  state = {
    pageSelect: false,
    pageList: [],
    pageSelectList: [],
    pageSelectShowList: [],
    markIds: [],
    tabIndex: 0,
    comment_page_list: [],
    comment_current_page: 1,
  }
  config = {
    navigationBarTitleText: "详情"
  }

  componentWillMount(){
    let url = this.$router.params.detail_url;
    let coverUrl = this.$router.params.coverUrl;
    let title = this.$router.params.title;
    this.setState({
      coverUrl,
      title,
      markIds: Taro.getStorageSync('markIds') || [],
      myid: url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.'))
    });
    Taro.showLoading({
      title: '正在加载...',
    });
    this.getPageDetail(url);
    this.getComments(1);
  }

  componentDidShow(){
    if (this.state.pageList.length === 0){
      return;
    }
    this.setReadPageIndex();

  }

  setReadPageIndex(){
    let marks = Taro.getStorageSync('marks');
    let index = this.state.markIds.indexOf(this.state.myid);
    if(index !== -1){
      const pageIndex = marks[index]['iReadPageIndex'];
      this.setState({
        pageIndex,
        readPageTitle:  this.state.pageList.length === 0 ? '' : (pageIndex === undefined ? pageIndex : this.state.pageList[pageIndex].title)
      });
      return pageIndex
    }
  }

  getPageDetail(url){
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_info?detail_url=' + url,
      method: 'get',
      success: (res)=>{

        let max_page_num = Math.ceil(res.data.res.length / 10);
        let pageIndex = this.setReadPageIndex();
        this.setState({
          desc: res.data.desc,
          isweeked: res.data.isweeked,
          author: res.data.author,
          clicknum: res.data.clicknum,
          status: res.data.status,
          pageList: res.data.res,
          pageSelectList: res.data.res,
          current_page: 1,
          max_page_num,
          pageSelectShowList: res.data.res.slice(0, 10),
          readPageTitle: pageIndex === undefined ? pageIndex : res.data[pageIndex].title
        });
      }
    })
  }

  getMoreComments(){
    if(this.state.comment_current_page < this.state.comment_total_page){
      this.getComments(this.state.comment_current_page + 1);
    }else{
      let dataList = this.state.comment_page_list;
      if(dataList[dataList.length - 1] === '加载完成'){
        return;
      }
      dataList.push('加载完成');
      this.setState({
        comment_page_list: dataList
      });
    }
  }

  getComments(pagenum){
    let detail_url = this.$router.params.detail_url;
    const firstIndex = detail_url.lastIndexOf('/') + 1;
    const lastIndex = detail_url.lastIndexOf('.');
    const id = detail_url.substring(firstIndex, lastIndex);
    Taro.request({
      url: 'https://www.hew.ac.cn/bg/get_page_comments/?id=' + id + '&pagenum=' + pagenum,
      method: 'get',
      success: (res)=>{
        Taro.hideLoading();
        this.setState({
          comment_current_page: pagenum,
          comment_total_page: res.data.total_page,
          comment_page_list: this.state.comment_page_list.concat(res.data.res)
        });
      }
    })
  }

  selectPageList(event){
    let item = event.currentTarget.dataset.value;
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

  toReadPage(event){
    let id = event.currentTarget.dataset.pageId;
    let index = event.currentTarget.dataset.index;
    let pageList = this.state.pageList;
    let preId;
    let nextId;
    if(pageList.length === 1){
      nextId = '';
      preId = '';
    }else{
      if(index === 0){
        preId = '';
        nextId = pageList[index + 1].page_id;
      }else if (index === pageList.length - 1){
        preId = pageList[index - 1].page_id;
        nextId = '';
      }else{
        nextId = pageList[index + 1].page_id;
        preId = pageList[index - 1].page_id;
      }
    }
    this.setIdsToRedux();
    this.setWhereIRead(id);
    Taro.navigateTo({
      url: '../bookimages/index?id=' + id + '&pre=' + preId + '&next=' + nextId + '&pageIndex=' + this.state.markIds.indexOf(this.state.myid)
    })
  }

  beginRead(){
    let id;
    const onPageListIndex = this.state.pageIndex;
    let pageList = this.state.pageList;
    let nextId = '';
    let preId = '';
    if(onPageListIndex !== undefined){
      id = pageList[onPageListIndex].page_id;
      if(onPageListIndex === 0){
        if (pageList.length === 1){
          nextId = ''
        }else{
          nextId = pageList[onPageListIndex + 1].page_id;
        }
      }else if(onPageListIndex === pageList.length - 1){
        if(pageList.length === 1){
          preId = ''
        }else{
          preId = pageList[onPageListIndex - 1].page_id;
        }
      }else{
        nextId = pageList[onPageListIndex + 1].page_id;
        preId = pageList[onPageListIndex - 1].page_id;
      }
    }else{
      id = pageList[0].page_id;
      if(pageList.length === 1){
        nextId = ''
      }else{
        nextId = pageList[1].page_id;
      }
    }
    this.setIdsToRedux();
    this.setWhereIRead(id);
    Taro.navigateTo({
      url: '../bookimages/index?id=' + id + '&pre=' + preId + '&next=' + nextId + '&pageIndex=' + this.state.markIds.indexOf(this.state.myid)
    })
  }

  setWhereIRead(pageId){
    let marks = Taro.getStorageSync('marks');
    const markIds = this.state.markIds;
    const myid = this.state.myid;
    let index = markIds.indexOf(myid);
    if(index !== -1){
      let pageIdIndex = 0;
      let pageList = this.state.pageList;
      for(;pageIdIndex < pageList.length; pageIdIndex++){
        if(pageId === pageList[pageIdIndex].page_id){
          break;
        }
      }
      marks[index]['iReadPageIndex'] = pageIdIndex;
      Taro.setStorageSync('marks', marks);
    }
  }

  setIdsToRedux(){
    let pageIds = this.state.pageList.map((item)=>{
      return item.page_id
    });
    let { setPageDetailIds } = this.props;
    setPageDetailIds(pageIds)
  }

  cancelMark(){
    const marks = Taro.getStorageSync('marks');
    const markIds = this.state.markIds;
    const index = markIds.indexOf(this.state.myid);
    markIds.splice(index, 1);
    marks.splice(index, 1);
    Taro.setStorageSync('marks', marks);
    Taro.setStorageSync('markIds', markIds);
    this.setState({
      markIds: markIds
    });
    Taro.showToast({
      title: '取消收藏',
      icon: 'success',
      duration: 1000
    });
  }

  mark(){
    if(this.state.markIds.indexOf(this.state.myid) !== -1){
      this.cancelMark();
      return;
    }
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

  changeTab(event){
    const tabIndex = event.currentTarget.dataset.tabIndex;
    if(tabIndex != this.state.tabIndex){
      this.setState({
        tabIndex
      });
    }
  }

  swiperTab(event){
    const currentTabIndex = event.detail.current;
    this.setState({
      tabIndex: currentTabIndex
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
      let pageSet = [''];
      for(let i = 0; i < setNum;i++){
        pageSet.push(i === (setNum -1) ? ((i * 50 + 1) + '-' + length) : ((i * 50 + 1) + '-' + ((i + 1) * 50)))
      }
      return pageSet;
    };

    return (
      <View className='all-container'>
        <View className='book-bg-image'>
          <Image src={this.state.coverUrl} mode='aspectFill' className='bg-image' />
          <View className='book-title-info'>
            <View className='book-detail-title'>
              <Text>{this.state.title}</Text>
            </View>
            <View className='desc-label'>
              <Text>热血 | {this.state.clicknum}人气</Text>
            </View>
          </View>
        </View>
        <View className='tab-list'>
          <View className={this.state.tabIndex == '0' ? 'tab active': 'tab'} dataTabIndex='0' onClick={this.changeTab}>简介</View>
          <View className={this.state.tabIndex == '1' ? 'tab active': 'tab'} dataTabIndex='1' onClick={this.changeTab}>目录</View>
        </View>
        <Swiper className='tab-panel' current={this.state.tabIndex} duration='300'  onChange={this.swiperTab}>
          <SwiperItem>
            <View className='container'>
              <ScrollView className='comments-scroll' scrollY='true' lowerThreshold='50' onScrollTolower={this.getMoreComments}>
                <View className='book-info-detail'>
                  <Image src={this.state.coverUrl} mode='widthFix' className='book-sm-img' />
                  <View className='desc-info'>
                    <Text>作者: {this.state.author}</Text>
                  </View>
                  <View className='desc-info'>
                    <Text>状态: {this.state.status}</Text>
                  </View>
                  <View className='desc-info'>
                    <Text>周更: {this.state.isweeked ? '是' : '否'}</Text>
                  </View>
                  <View className='desc-info'>
                    <Text>点击: {this.state.clicknum}</Text>
                  </View>
                  <View className='desc' style={{height: '100rpx', '-webkit-line-clamp': 3}}>
                    {this.state.desc}
                  </View>
                </View>
                <View className='comment'>
                  <View className='comment-main-title'>精彩点评</View>
                  {
                    this.state.comment_page_list.map((value, index)=>{
                      return value === '加载完成' ? <View className='end'>---我是有底线的---</View> : <View className='one-comment' key={index}>
                        <View className='comment-base-info'>
                          <Image className='user-face' src={value.user_face} />
                          <Text className='username'>{value.username}</Text>
                          {value.sex ? <Image className='user-sex' mode='widthFix' src={value.sex} /> : ''}
                          {value.level ? <Image className='user-level' mode='widthFix' src={value.level} /> : ''}
                          <Text className='comment-time'>{value.time}</Text>
                        </View>
                        <View className='comment-desc'>
                          {value.comment}
                        </View>
                      </View>
                    })
                  }
                </View>
              </ScrollView>
            </View>
          </SwiperItem>
          <SwiperItem>
            <View className='container'>
              <View className='select-page-container clearfix'>
                {
                  this.state.readPageTitle ? <Text className='where-i-read'>上次浏览到: {this.state.readPageTitle && this.state.readPageTitle.substring(0, this.state.readPageTitle.length - 11)}</Text> : ''
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
                    return  item === '加载完成' ? <View className='end'>---我是有底线的---</View> :
                      <View dataPageId={item.page_id} onClick={this.toReadPage} dataIndex={index} className='book-item-one-page' key={index}>
                        {/*<Image src={this.state.coverUrl} className='book-item-main-image' />*/}
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
            </View>
          </SwiperItem>
        </Swiper>
        <View className='collection' onClick={this.mark}>
          <Image src={redStar} className='btn-icon' />
          {this.state.markIds.indexOf(this.state.myid) === -1 ? '我要收藏' : '取消收藏'}
        </View>
        <View className='start-read' onClick={this.beginRead}>
          <Image src={read} className='btn-icon' />
          开始阅读
        </View>
      </View>
    )
  }
}

export default BookDetail

