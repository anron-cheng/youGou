// pages/category/index.js
import request from "../../utils/request.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 分类列表
    category:[],
    // 用户鼠标停留时的index
    current:0
  },


  onLoad() {
    request({
      url:"/categories",
    }).then(res=>{
      console.log(res)
      this.setData({
        category:res.data.message
      })
    })
  },

  chooseCategory(event){
    console.log(event)
    const { id } = event.target.dataset
    this.setData({
      current:id
    })
  }


})