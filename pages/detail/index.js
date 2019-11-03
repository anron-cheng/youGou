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
      console.log(message)
      this.setData({
        goods_detail:message
      })
    })
  },
  // 用户点击添加到购物车
  joinCart() {
    const { goods_id, goods_small_logo,goods_price,goods_name} = this.data.goods_detail
    const goodsList =  wx.getStorageSync("goodsCart") || {}
    // 判断本地存储中是否已存在
    const num = goodsList[goods_id] ? ++goodsList[goods_id].num :1

    goodsList[goods_id]={
      id :goods_id,
      img: goods_small_logo,
      price: goods_price,
      name: goods_name,
      num,
      choose :true
    }
    wx.setStorageSync("goodsCart", goodsList)
  },
  newBuy(){
    wx.switchTab({
      url:"../cart/index"
    })
  }

 
})