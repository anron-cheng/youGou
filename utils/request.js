
  const request = (config) => {
    if (!(config && typeof config === 'object' && !Array.isArray(config))) {
      console.error('传入参数不是对象！')
      return
    }
    const reg = /^http/
    if(!reg.test(config.url)){
      config.url = request.defaults.baseURL + config.url
    }

    return new Promise((resolve, reject) => {
      wx.request({
        ...config,
        success(res) {
          resolve(res)
        },
        fail(res){
          reject(res)
        },
        complete(res){
          if(typeof request.erorrs ==='function'){
            request.erorrs(res)
          }
        }
      })
    })

  }
  request.defaults={
    baseURL:''
  }

  request.erorrs = null

  request.onError = (callback)=>{
    request.erorrs = callback
  }
  export default request
