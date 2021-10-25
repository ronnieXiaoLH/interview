let fd = new FormData()
fd.append('name', 'xiaoming')
fd.append('age', 18)

axios({
  baseURL: 'http://127.0.0.1:3000',
  url: '/api/users',
  method: 'post',
  params: {
    a: 1,
    b: 2
  },
  data: {
    name: 'xiaoming',
    age: 18
  },
  // 只能用在 post/put/patch
  transformRequest: function (data) {
    if (Object.prototype.toString.call(data) === '[object Object]') {
      return Qs.stringify(data)
    }
    return data
  },
  // 设置请求头信息
  headers: {
    // 'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    common: {
      'x-token': 'xxx'
    },
    // 只针对某种请求设置
    post: {
      a: 10
    },
    get: {
      b: 20
    }
  },
  // 零散配置
  timeout: 1000,
  // 表示跨域请求时是否需要使用凭证(cookie)
  withCredentials: true,
  responseType: 'json',
  // 监测上传进度
  onUploadProgress: function (processEvent) {

  },
  // 监测下载进度
  onDownloadProgress: function (progressEvent) {

  }
})

// axios([config])
// axios.request([config])
// axios.get/head/delete/options([url], [config])
// axios.post/put/patch([url], [data], [config])