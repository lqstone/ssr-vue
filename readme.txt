### 环境准备
npm i cross-env  // 启动本地服务插件
npm i html-webpack-plugin // 入口html插件
postcss-loader  // 优化css代码 通过插件 比如：autoprefixer（不容浏览器的代码补全）
extract-text-webpack-plugin   // 打包分离css文件


### build 文件夹用来放置项目的配置文件
npm i webpack-merge  // 合并webpack不同的配置文件
npm i rimraf  // 每次打包删除原打包文件


### vue-loader cssModules 配置简述
在vue样式中增加module标签， 在引用的时候用$style.xxx, 实现对类名的hash转化


###  增加eslint
npm i eslint eslint-config-standard eslint-plugin-standard eslint-plugin-promise eslint-plugin-import eslint-plugin-node --save-dev

 "lint": "eslint --ext .js --ext .jsx --ext .vue client/",
 "lint:fix": "eslint --fix --ext .js --ext .jsx --ext .vue client/"
为了支持识别.vue中js:
npm i eslint-plugin-html

为了避免手动去执行eslint
npm i eslint-loader babel-eslint

编辑器添加插件 editconfig 优化编辑时候的代码


