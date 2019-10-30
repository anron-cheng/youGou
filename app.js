//app.js
import request from '/utils/request.js'
App({
  onLaunch(){
    request.defaults.baseURL ='https://api.zbztb.cn/api/public/v1'

    request.onError(res=>{
      if (res.statusCode==404){
        wx.showToast({
          title: '接口不存在',
          icon:'error'
        })
      }
    })
  }
})