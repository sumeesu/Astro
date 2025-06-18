---
title: 个性化定制指南
publishDate: 2024-07-27
description: 'astro-theme-pure 个性化定制指南'
tags:
  - Waline
  - Vercel
  - Supabase
heroImage: { src: './thumbnail.jpg', color: '#64574D' }
language: 'Chinese'
---

## 站点配置

[astro-theme-pure](https://github.com/cworld1/astro-theme-pure)  

自定义此主题需要调整大量源代码。

我们已尽力将配置选项集中到 `src/site.config.ts` 文件中，以方便用户使用，并集成了多种常见的社交媒体/工具图标。如果你想添加新图标，则需要自行修改源代码。

你可以全局搜索以下关键词来找到需要替换的文本：

- `Lorem ipsum`
- `astro-theme-pure`
- `cworld`

接下来我们将详细介绍各个部分。

### 配置文件

详情请参见 [配置文件](/docs/setup/configuration)。

#### Waline 评论系统

详情请参见 [Waline 评论系统](/docs/integrations/comment)。

#### 页脚

目前支持的社交平台包括：

- `coolapk`
- `telegram`
- `github`
- `bilibili`
- `twitter`
- `zhihu`
- `steam`
- `netease_music`

如果想添加新的社交平台，你需要修改以下文件：

- `src/types.ts`: 添加一个新的 `SocialLink.name` 枚举值以及对应的 `SocialMediaIconId` 图标映射关系
- `public/icons/social.svg`: 按照现有格式添加一个 symbol 新图标

  建议在以下网站查找社交图标以保持风格一致：

  - [remixicon](https://remixicon.com/)  
  - [mingcute](https://www.mingcute.com/)  

### 其他需要替换的文件

- `public/favicon`: 网站的 favicon。你可以在 [favicon.io](https://favicon.io/favicon-converter/) 生成一个 favicon  
- `public/images/social-card.png`: 网站的社交卡片图片
- `src/assets/`: 此目录包含客户端渲染的头像、赞助二维码等图片，请替换为你自己的图片

## 其他页面

### 关于

当前支持的图标可以在 `src/icons` 目录中找到。

如果你想添加新的工具图标，需要在 `src/icons` 目录下添加一个新图标。

建议在以下网站查找新图标以保持风格一致：

- [iconify](https://icon-sets.iconify.design/)  
- [icones](https://icones.js.org/)  

## 部署模式

详情请参见 [部署](/docs/deployment)。