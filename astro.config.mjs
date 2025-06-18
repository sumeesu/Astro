// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark'
import vercel from '@astrojs/vercel'
import AstroPureIntegration from 'astro-pure'
import { defineConfig } from 'astro/config'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

// 其他插件
// import { visualizer } from 'rollup-plugin-visualizer'

// 本地集成
// 本地 rehype & remark 插件
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts'
// Shiki 高亮插件及转换器
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle
} from './src/plugins/shiki-transformers.ts'
import config from './src/site.config.ts'

// https://astro.build/config
export default defineConfig({
  // 顶级选项
  site: 'https://astro-pure.js.org',
  // base: '/docs', // 如果你的站点部署在子路径下，可设置 base 路径
  trailingSlash: 'never', // URL 不带尾斜杠

  // 部署适配器配置
  // https://docs.astro.build/en/guides/deploy/
  adapter: vercel(), // 使用 Vercel Serverless
  output: 'server',
  // 若你想生成纯静态站点，可改为：
  // adapter: vercelStatic(),
  // 或者使用本地 Node 独立部署方式：
  // adapter: node({ mode: 'standalone' }),
  // output: 'server',

  // 图片处理服务（使用 Sharp）
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  // 集成插件配置
  integrations: [
    // Astro Pure 会内置 sitemap、mdx、unocss 等功能
    AstroPureIntegration(config)
    // 需要静态构建修复 Vercel 适配器时可启用下方插件
    // (await import('@playform/compress')).default({
    //   SVG: false,
    //   Exclude: ['index.*.js']
    // }),
  ],
  // 指定项目根目录（可选）
  // root: './my-project-directory',

  // 预取配置
  prefetch: true,

  // 开发服务器选项
  server: {
    host: true
  },

  // 多语言国际化配置（i18n）
  // 支持 zh-cn 和 en，默认中文
  i18n: {
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    routing: {
      prefixDefaultLocale: false,     // 默认语言路径不加前缀
      redirectToDefaultLocale: true,  // 根路径 '/' 重定向到 '/zh-cn/'
      fallbackType: 'rewrite'         // 多语言缺页时使用默认语言内容渲染
    }
  },

  // Markdown 处理配置
  markdown: {
    remarkPlugins: [remarkMath], // 支持数学公式解析
    rehypePlugins: [
      [rehypeKatex, {}], // 使用 KaTeX 渲染公式
      rehypeHeadingIds,  // 自动为标题添加 id 属性
      [
        rehypeAutolinkHeadings, // 自动为标题添加锚点链接
        {
          behavior: 'append',
          properties: { className: ['anchor'] },
          content: { type: 'text', value: '#' }
        }
      ]
    ],
    // 代码高亮配置（使用 Shiki）
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),           // 自动添加代码块标题
        addLanguage(),        // 在代码块添加语言标签
        addCopyButton(2000)   // 添加复制按钮，2000ms 消失提示
      ]
    }
  },

  // 实验性功能
  experimental: {
    contentIntellisense: true // 启用内容自动补全（开发体验）
  },

  // Vite（构建工具）配置
  vite: {
    plugins: [
      // bundle 分析插件
      // visualizer({
      //   emitFile: true,
      //   filename: 'stats.html'
      // })
    ]
  }
})
