module.exports = (isDev) => {
  return {
    preserveWhitepace: true, // 屏蔽代码中的空行
    extractCSS: false, // 是否将组建中的css合并
    cssModules: {
      localIdentName: isDev ? '[path]-[name]-[hash:5]' : '[hash:base64:5]', // 对元素类名进行重命名
      camelCase: true // 将类名-转化为驼峰
    }
  }
}
