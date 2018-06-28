import Vue from 'vue'
import App from './App'
import 'static/icons/iconfont'
import i18n from '@/plugins/chromeI18n'

Vue.config.productionTip = false
Vue.use(i18n)

window.githubtags = null

function test() {
  // 初始化 app
  function initApp() {
    const cacheDomUl = document.querySelector('ul.pagehead-actions')
    const cacheDomApp = document.createElement('li')
    cacheDomApp.id = 'githubtags'
    cacheDomUl.insertBefore(cacheDomApp, cacheDomUl.childNodes[0])
    window.githubtags = new Vue({
      el: '#githubtags',
      components: { App },
      template: '<App/>'
    })
  }
  // 检查 dom 节点是否还存在
  function checkStat() {
    const cacheDomUl = document.querySelector('ul.pagehead-actions')
    if (cacheDomUl === null) {
      // 当前页面不在工作范围
      return
    }
    const cacheDomApp = cacheDomUl.querySelector('li#githubtags')
    if (cacheDomApp === null) {
      // 不存在，则初始化
      initApp()
    }
  }

  document.addEventListener('pjax:end', checkStat)
  initApp()
}
test()
