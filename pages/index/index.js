//index.js
//获取应用实例
import request from '../../utils/request.js'
const app = getApp()



Page({
  onLoad(){
    request({
      url:'/api/public/v1/home/swiperdata',
    }).then(res=>{
      console.log(res.data.message)
      this.setData({ background: res.data.message})
        
      
    })
  },
  data: {
    background: [],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500
  },

})
