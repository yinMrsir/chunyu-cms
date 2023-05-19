import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'zh-CN',
  title: '淳渔CMS',
  description: '淳渔CMS-Nodejs快速搭建影视，视频类网站的系统，它基于nuxt3、vue3、nestjs，也非常适合二次开发。',
  theme: defaultTheme({
    logo: '/dice-roller-logo.png',
    navbar: [
      { text: '首页', link: '/' },
      { text: '文档', link: '/guide/' },
    ],
    sidebar: {
      '/guide/': [
        {
          text: '开始',
          children: [
            '/guide/',
          ],
        },
        {
          text: '服务端',
          children: [
            '/guide/getting-started',
          ],
          collapsible: true,
        },
        {
          text: '用户端',
          children: [],
          collapsible: true,
        },
        {
          text: '管理端',
          children: [],
          collapsible: true,
        },
      ]
    },
  })
})