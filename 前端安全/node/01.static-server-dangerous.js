const fs = require('fs')
const http = require('http')
const path = require('path')
// const resolvePath = require('resolve-path')

http.createServer(function (req, res) {
  try {
    const filePath = path.join(__dirname, 'static', req.url)
    // const rootDir = path.join(__dirname, static)
    // const filePath = resolvePath(rootDir, req.url)
    fs.readFile(filePath, function (err, data) {
      if (err) {
        throw err
      } else {
        res.writeHead(200, {'content-Type': 'text/plain;charset=utf-8'})
        res.end(data)
      }
    })
  } catch (error) {
    console.log(error)
    res.writeHead(404, {'content-Type': 'text/plain;charset=utf-8'})
    res.end('找不到对应的资源')
  }
}).listen(8000, () => {
  console.log('Server running at 8000')
})