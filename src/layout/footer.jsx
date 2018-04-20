import '../assets/styles/footer.less'
//  使用jsx的方式引入组件
export default {
  data () {
    return {
      author: 'stone'
    }
  },
  render () {
    return (
      <div id="footer">
        <span>Power by {this.author}</span>
        <br/>
      </div>
    )
  }
}
