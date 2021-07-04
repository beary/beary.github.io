import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'

export default defineUserConfig<DefaultThemeOptions>({
  title: 'Beary 的笔记本',
  themeConfig: {
    sidebar: [
      {
        isGroup: true,
        text: 'Vue',
        children: ['/vue/vue3-reactivity-system.md']
      },
      {
        isGroup: true,
        text: 'CSS',
        children: ['/css/css.md', '/css/selector.md']
      }
    ]
  }
})
