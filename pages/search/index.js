// pages/search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用户搜索框内容
    content: '',
    // 取消按钮显示
    cancelBtn: false,
    // 历史保存内容
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      history: wx.getStorageSync('search') || []
    })
  },
  // 用户输入数据时触发
  handInput(event) {

    const {
      value
    } = event.detail

    let cancelBtn = false
    cancelBtn = value ? true : false
    this.setData({
      content: value,
      cancelBtn
    })
  },
  // 用户点击取消按钮
  handCancel() {
    this.setData({
      content: '',
      cancelBtn: false
    })
  },
  // 用户按enter提交
  handSubmit() {
    const arr = this.data.history.filter(v=>{
      if (v.indexOf(this.data.content) == -1) return true
      console.log(v.indexOf(this.data.content))
    })
    arr.unshift(this.data.content)
    wx.setStorageSync('search', arr)
    wx.navigateTo({
      url: "/pages/goods/index?query=" + this.data.content
    })
  },
  // 用户点击历史记录，input内容变化
  historyContent(event) {
    const {
      content
    } = event.target.dataset
    this.setData({
      content
    })
  },
  // 用户点击清空历史记录
  clearHistory() {
    wx.setStorageSync('search')
    this.setData({
      history: []
    })
  }
})