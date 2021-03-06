import Taro, { Component } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'

import Index from './pages/currentweek'

import configStore from './store'

import './app.scss'

const store = configStore()

class App extends Component {

  config = {
    pages: [
      'pages/welcome/index',
      'pages/currentweek/index',
      'pages/bookdetail/index',
      'pages/ifind/index',
      'pages/onlyme/index',
      'pages/morebook/index',
      'pages/bookimages/index',
      'pages/mycollections/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#de494b',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      borderStyle: "#F6F8F9",
      position: "bottom",
      backgroundColor: 'white',
      selectedColor: '#DD4F42',
      list: [
        {
          pagePath: "pages/currentweek/index",
          text: "本周推荐",
          iconPath: "images/icon/bookcity.png",
          selectedIconPath: "images/icon/bookcity-active.png"

        },{
          pagePath: "pages/onlyme/index",
          text: "独家首发",
          iconPath: "images/icon/bookjia.png",
          selectedIconPath: "images/icon/bookjia-active.png"
        },{
          pagePath: "pages/ifind/index",
          text: "自己找找",
          iconPath: "images/icon/me.png",
          selectedIconPath: "images/icon/me-active.png"
        },{
          pagePath: "pages/mycollections/index",
          text: "我的收藏",
          iconPath: "images/icon/collection.png",
          selectedIconPath: "images/icon/collection-active.png"
        }
      ]
    }
  }

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
