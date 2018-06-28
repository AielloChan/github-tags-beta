function install(Vue, options) {
  // add global chrome i18n
  Vue.prototype.$i18n = chrome.i18n.getMessage
  Vue.prototype.__ = Vue.prototype.$i18n
}

export default {
  install
}
