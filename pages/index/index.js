//index.js
//获取应用实例
import request from '../../utils/request.js'
const app = getApp()



Page({
  onLoad(){
    // 请求轮播图
    request({
      url:'/home/swiperdata',
    }).then(res=>{
      console.log(res.data.message)
      this.setData({ background: res.data.message})
    })
    // 请求导航栏
    request({
      url: '/home/catitems',
    }).then(res => {
      console.log(res.data.message)
      this.setData({ nav: res.data.message })
    })
    // 请求楼层
    request({
      url: '/home/floordata',
    }).then(res => {
      console.log(res.data.message)
      this.setData({ floorData: res.data.message })
    })
  },
  data: {
    // 轮播图
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    // 导航栏
    nav:[],
    // 楼层
    floorData:[]
  },

})
