// pages/detail/index.js
import request from "../../utils/request.js"
Page({

  data: {
    // 轮播图
    background: [],
    indicatorDots: true,
    vertical: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
    // 页面参数商品Id
    goods_id:0,
    // 商品详情
    goods_detail:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.setData({
      goods_id
    })

    // 获取商品详情数据
    request({
      url:"/goods/detail",
      data:{
        goods_id: this.data.goods_id
      }
    }).then(res=>{
      
      const {message} =res.data
      this.setData({
        goods_detail:message
      })
    })
    
  },

 
})