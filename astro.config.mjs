// @ts-check

import { rehypeHeadingIds } from '@astrojs/markdown-remark';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

// 本地集成
// 本地 rehype & remark 插件
import rehypeAutolinkHeadings from './src/plugins/rehype-auto-link-headings.ts';
// Shiki 高亮插件及转换器
import {
  addCopyButton,
  addLanguage,
  addTitle,
  transformerNotationDiff,
  transformerNotationHighlight,
  updateStyle,
} from './src/plugins/shiki-transformers.ts';
import config from './src/site.config.ts';
// 假设 AstroPureIntegration 是你的自定义集成
// import AstroPureIntegration from './path/to/AstroPureIntegration'; 

// https://astro.build/config
export default defineConfig({
  // 顶级选项
  // ✅ 已修正: site 应为网站的根域名，不包含子路径
  site: 'https://sumeesu.github.io', 
  // ✅ 已修正: base 是你的仓库名作为子路径，前面有斜杠，后面没有斜杠
  base: '/Astro',
  
  trailingSlash: 'never', // URL 不带尾斜杠

  // 部署适配器配置
  output: 'static', // 使用静态站点输出，适用于 GitHub Pages

  // 图片处理服务（使用 Sharp）
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },

  // 集成插件配置
  integrations: [
    // 你的自定义集成，这里假设它是正确的
    // AstroPureIntegration(config), // 如果 AstroPureIntegration 不存在或有误，请注释掉
  ],

  // 预取配置
  prefetch: true,

  // 开发服务器选项
  server: {
    host: true,
  },

  // 多语言国际化配置（i18n）
  // 注意：在静态站点上，redirectToDefaultLocale 的重定向是通过 meta refresh 标签实现的
  // 如果部署后根路径（/Astro/）访问有问题，可以考虑将 prefixDefaultLocale 改为 true 进行调试
  i18n: {
    locales: ['zh-cn', 'en'],
    defaultLocale: 'zh-cn',
    routing: {
      prefixDefaultLocale: false,     // 默认语言路径不加前缀
      redirectToDefaultLocale: true,  // 根路径 '/' 重定向到默认语言路径
      fallbackType: 'rewrite',        // 多语言缺页时使用默认语言内容渲染
    },
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
          content: { type: 'text', value: '#' },
        },
      ],
    ],
    // 代码高亮配置（使用 Shiki）
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      transformers: [
        transformerNotationDiff(),
        transformerNotationHighlight(),
        updateStyle(),
        addTitle(),           // 自动添加代码块标题
        addLanguage(),        // 在代码块添加语言标签
        addCopyButton(2000),  // 添加复制按钮，2000ms 消失提示
      ],
    },
  },

  // 实验性功能
  experimental: {
    contentIntellisense: true, // 启用内容自动补全（开发体验）
  },

  // Vite（构建工具）配置
  vite: {
    plugins: [
      // bundle 分析插件
      // visualizer({
      //   emitFile: true,
      //   filename: 'stats.html'
      // })
    ],
  },
});