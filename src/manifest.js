/**
 * @see {@link https://developer.chrome.com/extensions/manifest}
 */
module.exports = {
  manifest_version: 2,
  name: '__MSG_extName__', // Vue Extension
  description: '__MSG_extDescription__', // Vue.js Webpack Chrome Extension Template
  author: 'Aiello Chan <Aiello.Chan@Gmail.com>',
  version: '1.0.0',
  default_locale: 'en',
  icons: {
    '16': 'icons/16.png',
    '128': 'icons/128.png'
  },
  /**
   * @see {@link https://developer.chrome.com/extensions/declare_permissions}
   */
  permissions: [
    'https://api.github.com/',
    'https://github.com/*/*',
    'contextMenus',
    'tabs',
    'activeTab',
    'storage',
    'background'
  ],
  browser_action: {
    default_title: 'Github Tags'
  },
  options_page: 'pages/options.html',
  content_scripts: [
    {
      js: ['js/manifest.js', 'js/vendor.js', 'js/content.js'],
      run_at: 'document_idle',
      matches: ['https://github.com/*/*'],
      all_frames: true
    }
  ],
  content_security_policy: "script-src 'self'; object-src 'self'",
  web_accessible_resources: ['panel.html', 'js/content.js']
}
