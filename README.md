# stitch-frontend

> frontend using vue.js and element-ui of my picture stitching system

## Build Setup

``` bash
# install dependencies
解决办法：

1、执行：

npm config get proxy
npm config get https-proxy
如果返回值不为null，继续执行：
（这一步很重要，一定要保证两个命令的返回值都为null,话说回来，应该出现这个错误这两个返回值有不为null的）
npm config set proxy null
npm config set https-proxy null
2、执行：


rm -rf node_modules
rm -rf package-lock.json
npm cache clear --force


npm install cnpm --registry=https://registry.npm.taobao.org --legacy-peer-deps -D  //局部安装


# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
