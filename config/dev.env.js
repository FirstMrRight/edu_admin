'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
     BASE_API: '"http://localhost:9001"',
  //阿里云bucket地址
  OSS_PATH: '"https://guli-file-liutaixiang.oss-cn-beijing.aliyuncs.com"'
})
