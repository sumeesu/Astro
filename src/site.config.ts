import type { CardListData, Config, IntegrationUserConfig, ThemeUserConfig } from 'astro-pure/types'

// 主题基础配置
export const theme: ThemeUserConfig = {
  // === 基础配置 ===
  /**
   * 网站标题。用于元数据和浏览器标签页标题。
   */
  title: 'Astro Theme Pure',

  /**
   * 作者信息，用于首页和版权声明。
   */
  author: 'Pure Lab',

  /**
   * 网站描述元数据，可用于页面元信息。
   */
  description: 'Stay hungry, stay foolish',

  /**
   * 默认网站图标（favicon），应为 public/ 目录下的图片路径。
   */
  favicon: '/favicon/favicon.ico',

  /**
   * 指定该网站的默认语言。
   */
  locale: {
    lang: 'zh-CN',        // 界面语言设为中文（简体）
    attrs: 'zh_CN',       // (可选) 属性中的语言标识
    // 日期本地化设置
    dateLocale: 'zh-CN',  // 使用简体中文地区设置
    dateOptions: {
      day: 'numeric',        // 数字形式的日，如 1、2、30
      month: 'short',        // 缩写的月份，如 “1月”、”2月”
      year: 'numeric',       // 四位数字年，如 2025
    }
  },

  /**
   * 设置在首页显示的 logo 图片。
   */
  logo: {
    src: 'src/assets/avatar.png',
    alt: 'Avatar'
  },


  // === 全局配置 ===
  titleDelimiter: '•', // 标题分隔符
  prerender: true, // 启用预渲染
  npmCDN: 'https://cdn.jsdelivr.net/npm',  // NPM CDN 地址

  // 尚未启用
  head: [
    /* Telegram 频道示例 */
    // {
    //   tag: 'meta',
    //   attrs: { name: 'telegram:channel', content: '@cworld0_cn' },
    //   content: ''
    // }
  ],
  customCss: [], // 自定义 CSS 文件路径数组


  /**
   * 配置网站头部。
   */
  header: {
    menu: [
      { title: '博客', link: '/blog' },
      { title: '文档', link: '/docs' },
      { title: '项目', link: '/projects' },
      { title: '友链', link: '/links' },
      { title: '关于', link: '/about' }
    ]
  },


  /**
   * 配置网站底部。
   */
  footer: {
    links: [
      // 备案链接
      {
        title: 'Moe ICP APTX4869',
        link: 'https://icp.gov.moe/?keyword=APTX4869',
        style: 'text-sm' // Uno/TW CSS 类
      },
      {
        title: 'Travelling',
        link: 'https://www.travellings.cn/go.html',
        style: 'text-sm'
      },
      // 隐私政策链接
      {
        title: '站点政策',
        link: '/terms/list',
        pos: 2 // 位置设为 2 表示附加在版权行上
      }
    ],
    /**
     * 在网站底部启用 “Astro & Pure theme powered” 链接。
     */
    credits: true,

    /**
     * 可选的社交账号信息。
     */
    social: { github: 'https://github.com/cworld1/astro-theme-pure' }
  },


  content: {
    externalLinksContent: ' ↗', // 外部链接后缀
    /**
     * 博客页面每页文章数量（可选）
     */
    blogPageSize: 8,
    externalLinkArrow: true, // 显示外部链接箭头
    // 当前支持 weibo、x、bluesky
    share: ['weibo', 'x', 'bluesky']
  }
}


// 集成相关配置
export const integ: IntegrationUserConfig = {
  // 链接管理
  // 查看：https://astro-pure.js.org/docs/integrations/links
  links: {
    // 友情日志
    logbook: [
      { date: '2024-07-01', content: 'Lorem ipsum dolor sit amet.' },
      { date: '2024-07-01', content: 'vidit suscipit at mei.' },
      { date: '2024-07-01', content: 'Quem denique mea id.' }
    ],
    // 自己的链接信息
    applyTip: [
      { name: '名称', val: theme.title },
      { name: '描述', val: theme.description || '暂无描述' },
      { name: '链接', val: 'https://astro-pure.js.org/' },
      { name: '头像', val: 'https://astro-pure.js.org/favicon/favicon.ico' }
    ]
  },

  // 启用页面搜索功能
  pagefind: true,

  // 在页脚添加随机名言（默认显示在首页页脚）
  // 查看：https://astro-pure.js.org/docs/integrations/advanced#web-content-render   
  quote: {
    // https://developer.hitokoto.cn/sentence/#%E8%AF%B7%E6%B1%82%E5%9C%B0%E5%9D%80   
    // server: 'https://v1.hitokoto.cn/?c=i',
    // target: (data) => (data as { hitokoto: string }).hitokoto || 'Error'

    // Quotable API 示例
    server: 'https://api.quotable.io/quotes/random?maxLength=60',
    target: `(data) => data[0].content || '错误'`
  },

  // UnoCSS 排版样式
  // 查看：https://unocss.dev/presets/typography
  typography: {
    class: 'prose text-base text-muted-foreground'
  },

  // 支持图片缩放的轻量级库
  // 查看：https://astro-pure.js.org/docs/integrations/others#medium-zoom   
  mediumZoom: {
    enable: true, // 禁用将不会加载整个库
    selector: '.prose .zoomable',
    options: {
      className: 'zoomable'
    }
  },

  // 评论系统配置
  waline: {
    enable: true,
    // 服务器服务链接
    server: 'https://astro-theme-pure-waline.arthals.ink/',   

    // Waline 表情配置，查看：https://waline.js.org/en/guide/features/emoji.html   
    emoji: ['bmoji', 'weibo'],

    // Waline 客户端配置选项，查看：https://waline.js.org/en/reference/client/props.html   
    additionalConfigs: {
      // search: false,
      pageview: true,
      comment: true,
      locale: {
        reaction0: '点赞',
        placeholder: '欢迎留言。（填写邮箱可接收回复，无需登录）'
      },
      imageUploader: false
    }
  }
}


// 条款页面数据
export const terms: CardListData = {
  title: '条款内容',
  list: [
    {
      title: '隐私政策',
      link: '/terms/privacy-policy'
    },
    {
      title: '使用条款',
      link: '/terms/terms-and-conditions'
    },
    {
      title: '版权声明',
      link: '/terms/copyright'
    },
    {
      title: '免责声明',
      link: '/terms/disclaimer'
    }
  ]
}


// 导出最终配置
const config = { ...theme, integ } as Config
export default config