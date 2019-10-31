// pages/goods/index.js
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsTitle:["综合","销量","价格"],
    // 选择过滤类型
    currend:0,
    // 改变价格顺序
    filter_price:false,
    // 分类页面传过来的参数
    category:"",
    // 商品内容
    newGoods:[],
    // 当前页面
    pagenum:1,
    // 每页多少条
    pagesize:10,
    // 商品列表是否全部数据加载完
    lodingFinish:false,
    // 是否请求返回成功
    getGoodsFinish:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 将路劲参数传入data
    const {query} = options
    this.setData({
      category: query
    })
      // 请求列表数据
    this.getGoodsList()
  },
  // 请求列表数据
  getGoodsList(){
    if(this.data.getGoodsFinish){
      return
    }
    this.setData({
      getGoodsFinish: true
    })
    request({
      url: "/goods/search",
      data: {
        query: this.data.category,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      }
    }).then(res => {
      console.log(res)
      const { goods } = res.data.message
      // 判断列表是否够十条
      if (goods.length != 10){
        this.setData({
          lodingFinish:true
        })
      }
      // 循环添加价格小数点后两位
      goods.map(v => {
        v.goods_price = new Number(v.goods_price).toFixed(2)
      })
      this.setData({
        newGoods: [...this.data.newGoods,...goods],
        pagenum:this.data.pagenum+1,
        getGoodsFinish:false
      })
    })
  },
  // 点击过滤时触发
  change_goodsTitle(event){
    if(this.data.currend==2){
      this.setData({
        filter_price : !this.data.filter_price
      })
    }
    const {id} = event.target.dataset
    this.setData({
      currend:id
    })
  },
    /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (!this.data.lodingFinish){
      this.getGoodsList()
    }
   
  }
})