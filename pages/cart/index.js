// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户地址信息
    userAddress:{},
    // 判断用户是否设置地址
    hasAddress:false,
    // 用户购物车信息
    goodsList:{},
    // 判读用户购物车是否有商品
    hasGoods:false,
    // 全选按钮
    allGoods:true,
    // 总价格
    total:0,
    // 结算数量
    totalNum:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow(){
    // 获取用户收货地址
    this.setData({
      userAddress: wx.getStorageSync('userAddress') || {}
    })
    if (this.data.userAddress.name){
        this.setData({
          hasAddress:true
        })
    }
    // 获取用户购物车数据
    this.setData({
      goodsList:wx.getStorageSync('goodsCart') || {}
    })
    // 判断购物车是否有数据
    if (Object.keys(this.data.goodsList).length>0){
        this.setData({
          hasGoods:true
        })
      this.judgeAllchoose()
      // 计算总金额
      this.computerGoods()
    }
  },

  setAddress(){
    // 收集用户信息
    wx.chooseAddress({
      success(res){
        const userAddress={
          name: res.userName,
          province: res.provinceName,
          city: res.cityName,
          county: res.countyName,
          detail: res.detailInfo,
          telNumber: res.telNumber
        }
        wx.setStorageSync("userAddress",userAddress)
      }
    })
  },
  // 用户点击添加商品按钮
  goodsAdd(event){
    const {id} = event.target.dataset
    const newGoods = this.data.goodsList
    newGoods[id].num +=1
    this.setData({
      goodsList: newGoods
    })
    wx.setStorageSync("goodsCart", this.data.goodsList)
    // 计算总金额
    this.computerGoods()
  },
  // 用户点击减除商品按钮
  goodsMinus(event){
    const { id } = event.target.dataset
    const newGoods = this.data.goodsList
    newGoods[id].num -= 1
    if (newGoods[id].num < 1) {
      newGoods[id].num = 1
      wx.showModal({
        title: '提示',
        content: '确定要删除这一商品吗',
        success:(res)=> {
          if (res.confirm) {
            delete newGoods[id]
            this.setData({
              goodsList: newGoods
            })
            wx.setStorageSync("goodsCart", this.data.goodsList)
          } else if (res.cancel) {
            this.setData({
              goodsList: newGoods
            })
            wx.setStorageSync("goodsCart", this.data.goodsList)
          }
        }
      })
    }else{
      this.setData({
        goodsList: newGoods
      })
      wx.setStorageSync("goodsCart", this.data.goodsList)
    }
    // 计算总金额
    this.computerGoods()

  },
  // 用户数据input输入框
  changeNum(event){
    const { value } = event.detail
    const { id } = event.target.dataset
    const newGoods = this.data.goodsList
    let num = parseInt(value) 
    newGoods[id].num = num? num :1
    this.setData({
      goodsList: newGoods
    })
    wx.setStorageSync("goodsCart", this.data.goodsList)
    // 计算总金额
    this.computerGoods()
  },
  // 用户点击选中商品
  chooseList(event){
    const {id} = event.target.dataset
    const newGoods = this.data.goodsList
    newGoods[id].choose = !newGoods[id].choose
    this.setData({
      goodsList: newGoods
    })
    wx.setStorageSync("goodsCart", this.data.goodsList)
    this.judgeAllchoose()
    // 计算总金额
    this.computerGoods()
  },
  // 用户点击全选按钮
  chooseAll(){
    this.setData({
      allGoods : !this.data.allGoods
    })
    const newGoods = this.data.goodsList
    Object.keys(newGoods).map(v=>{
      newGoods[v].choose = this.data.allGoods
    })
    this.setData({
      goodsList: newGoods
    })
    wx.setStorageSync("goodsCart", this.data.goodsList)
    // 计算总金额
    this.computerGoods()
  },

  judgeAllchoose(){
    // 循环，判断数据内列表选择是否全是true
    const res = Object.keys(this.data.goodsList).some(v => {
      if (!this.data.goodsList[v].choose) {
        return true
      }
    })
    this.setData({
      allGoods: !res
    })
  },
  // 计算总价和商品数
  computerGoods(){
    // 计算总金额
    var total = 0
    const computerTotal = Object.keys(this.data.goodsList).filter(v => {
      if (this.data.goodsList[v].choose) {
        total += this.data.goodsList[v].price * this.data.goodsList[v].num
        return true
      }
    })
    this.setData({
      total,
      totalNum: computerTotal.length
    })
  }
})