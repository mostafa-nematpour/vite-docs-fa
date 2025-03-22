import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { transformerTwoslash } from '@shikijs/vitepress-twoslash'
import {
  groupIconMdPlugin,
  groupIconVitePlugin
} from 'vitepress-plugin-group-icons'
import { buildEnd } from './buildEnd.config'

const ogDescription = 'ابزار نسل بعدی فرانت‌اند'
const ogImage = 'https://vite.dev/og-image.jpg'
const ogTitle = 'Vite'
const ogUrl = 'https://vite.dev'

// netlify envs
const deployURL = process.env.DEPLOY_PRIME_URL || ''
const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev'

const deployType = (() => {
  switch (deployURL) {
    case 'https://main--vite-docs-main.netlify.app':
      return 'main'
    case '':
      return 'local'
    default:
      return 'release'
  }
})()
const additionalTitle = ((): string => {
  switch (deployType) {
    case 'main':
      return ' (main branch)'
    case 'local':
      return ' (local)'
    case 'release':
      return ''
  }
})()
const versionLinks = ((): DefaultTheme.NavItemWithLink[] => {
  const oldVersions: DefaultTheme.NavItemWithLink[] = [
    {
      text: 'Vite 5 Docs',
      link: 'https://v5.vite.dev'
    },
    {
      text: 'Vite 4 Docs',
      link: 'https://v4.vite.dev'
    },
    {
      text: 'Vite 3 Docs',
      link: 'https://v3.vite.dev'
    },
    {
      text: 'Vite 2 Docs',
      link: 'https://v2.vite.dev'
    }
  ]

  switch (deployType) {
    case 'main':
    case 'local':
      return [
        {
          text: 'Vite 6 Docs (release)',
          link: 'https://vite.dev'
        },
        ...oldVersions
      ]
    case 'release':
      return oldVersions
  }
})()

export default defineConfig({
  title: `Vite${additionalTitle}`,
  description: 'ابزار نسل بعدی فرانت‌اند',
  dir: 'rtl',
  lang: 'fa',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    [
      'link',
      { rel: 'alternate', type: 'application/rss+xml', href: '/blog.rss' }
    ],
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'true'
      }
    ],
    [
      'link',
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@400&display=swap',
        as: 'style'
      }
    ],
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@600&family=IBM+Plex+Mono:wght@400&display=swap'
      }
    ],
    ['link', { rel: 'me', href: 'https://m.webtoo.ls/@vite' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: ogTitle }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:description', content: ogDescription }],
    ['meta', { property: 'og:site_name', content: 'vitejs' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:site', content: '@vite_js' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'CBDFBSLI',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],

  locales: {
    root: { label: 'فارسی' },
    zh: { label: '简体中文', link: 'https://cn.vite.dev' },
    ja: { label: '日本語', link: 'https://ja.vite.dev' },
    es: { label: 'Español', link: 'https://es.vite.dev' },
    pt: { label: 'Português', link: 'https://pt.vite.dev' },
    ko: { label: '한국어', link: 'https://ko.vite.dev' },
    de: { label: 'Deutsch', link: 'https://de.vite.dev' }
  },

  themeConfig: {
    logo: '/logo.svg',

    docFooter: {
      prev: 'قبلی',
      next: 'بعدی'
    },

    outlineTitle: 'در این صفحه',

    editLink: {
      pattern:
        'https://github.com/mostafa-nematpour/vite-docs-fa/edit/main/docs/:path',
      text: 'اصلاح ترجمه این صفحه در گیت‌هاب'
    },

    socialLinks: [
      { icon: 'bluesky', link: 'https://bsky.app/profile/vite.dev' },
      { icon: 'mastodon', link: 'https://elk.zone/m.webtoo.ls/@vite' },
      { icon: 'x', link: 'https://x.com/vite_js' },
      { icon: 'discord', link: 'https://chat.vite.dev' },
      { icon: 'github', link: 'https://github.com/vitejs/vite' }
    ],

    algolia: {
      appId: '7H67QR5P0A',
      apiKey: '208bb9c14574939326032b937431014b',
      indexName: 'vitejs',
      searchParameters: {
        facetFilters: ['tags:en']
      }
    },

    carbonAds: {
      code: 'CEBIEK3N',
      placement: 'vitejsdev'
    },

    footer: {
      message: `تحت مجوز MIT منتشر شده. (${commitRef})`,
      copyright:
        'کپی‌رایت © ۲۰۱۹ تا کنون متعلق به VoidZero Inc و مشارکت‌کنندگان vite.'
    },

    nav: [
      { text: 'مستندات', link: '/guide/', activeMatch: '/guide/' },
      { text: 'کانفیگ', link: '/config/', activeMatch: '/config/' },
      { text: 'پلاگین‌ها', link: '/plugins/', activeMatch: '/plugins/' },
      {
        text: 'منابع',
        items: [
          { text: 'Team', link: '/team' },
          { text: 'Blog', link: '/blog' },
          { text: 'Releases', link: '/releases' },
          {
            items: [
              {
                text: 'Bluesky',
                link: 'https://bsky.app/profile/vite.dev'
              },
              {
                text: 'Mastodon',
                link: 'https://elk.zone/m.webtoo.ls/@vite'
              },
              {
                text: 'X',
                link: 'https://x.com/vite_js'
              },
              {
                text: 'Discord Chat',
                link: 'https://chat.vite.dev'
              },
              {
                text: 'Awesome Vite',
                link: 'https://github.com/vitejs/awesome-vite'
              },
              {
                text: 'ViteConf',
                link: 'https://viteconf.org'
              },
              {
                text: 'DEV Community',
                link: 'https://dev.to/t/vite'
              },
              {
                text: 'Changelog',
                link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md'
              },
              {
                text: 'Contributing',
                link: 'https://github.com/vitejs/vite/blob/main/CONTRIBUTING.md'
              }
            ]
          }
        ]
      },
      {
        text: 'نسخه',
        items: versionLinks
      }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'مقدمه',
          items: [
            {
              text: 'شروع',
              link: '/guide/'
            },
            {
              text: 'فلسفه',
              link: '/guide/philosophy'
            },
            {
              text: 'چرا Vite',
              link: '/guide/why'
            }
          ]
        },
        {
          text: 'راهنما',
          items: [
            {
              text: 'ویژگی‌ها',
              link: '/guide/features'
            },
            {
              text: 'رابط خط فرمان - CLI',
              link: '/guide/cli'
            },
            {
              text: 'استفاده از پلاگین‌ها ',
              link: '/guide/using-plugins'
            },
            {
              text: 'پیش‌بسته‌بندی وابستگی',
              link: '/guide/dep-pre-bundling'
            },
            {
              text: 'مدیریت asset های استاتیک',
              link: '/guide/assets',
            },
            {
              text: 'Building for Production',
              link: '/guide/build'
            },
            {
              text: 'دیپلوی یک سایت استاتیک',
              link: '/guide/static-deploy'
            },
            {
              text: 'متغیرهای محیطی (Env Variables) و حالت‌ها ',
              link: '/guide/env-and-mode'
            },
            {
              text: 'Server-Side Rendering (SSR)',
              link: '/guide/ssr'
            },
            {
              text: 'Backend Integration',
              link: '/guide/backend-integration'
            },
            {
              text: 'عیب‌یابی',
              link: '/guide/troubleshooting'
            },
            {
              text: 'عملکرد',
              link: '/guide/performance'
            },
            {
              text: 'مهاجرت از v5',
              link: '/guide/migration'
            },
            {
              text: 'تغییرات اساسی',
              link: '/changes/'
            }
          ]
        },
        {
          text: 'API ها',
          items: [
            {
              text: 'API پلاگین',
              link: '/guide/api-plugin'
            },
            {
              text: 'HMR API',
              link: '/guide/api-hmr'
            },
            {
              text: 'JavaScript API',
              link: '/guide/api-javascript'
            },
            {
              text: 'Config Reference',
              link: '/config/'
            }
          ]
        },
        {
          text: 'Environment API',
          items: [
            {
              text: 'Introduction',
              link: '/guide/api-environment'
            },
            {
              text: 'Environment Instances',
              link: '/guide/api-environment-instances'
            },
            {
              text: 'Plugins',
              link: '/guide/api-environment-plugins'
            },
            {
              text: 'Frameworks',
              link: '/guide/api-environment-frameworks'
            },
            {
              text: 'Runtimes',
              link: '/guide/api-environment-runtimes'
            }
          ]
        }
      ],
      '/config/': [
        {
          text: 'Config',
          items: [
            {
              text: 'Configuring Vite',
              link: '/config/'
            },
            {
              text: 'Shared Options',
              link: '/config/shared-options'
            },
            {
              text: 'Server Options',
              link: '/config/server-options'
            },
            {
              text: 'Build Options',
              link: '/config/build-options'
            },
            {
              text: 'Preview Options',
              link: '/config/preview-options'
            },
            {
              text: 'Dep Optimization Options',
              link: '/config/dep-optimization-options'
            },
            {
              text: 'SSR Options',
              link: '/config/ssr-options'
            },
            {
              text: 'Worker Options',
              link: '/config/worker-options'
            }
          ]
        }
      ],
      '/changes/': [
        {
          text: 'Breaking Changes',
          link: '/changes/'
        },
        {
          text: 'Current',
          items: []
        },
        {
          text: 'Future',
          items: [
            {
              text: 'this.environment in Hooks',
              link: '/changes/this-environment-in-hooks'
            },
            {
              text: 'HMR hotUpdate Plugin Hook',
              link: '/changes/hotupdate-hook'
            },
            {
              text: 'Move to per-environment APIs',
              link: '/changes/per-environment-apis'
            },
            {
              text: 'SSR using ModuleRunner API',
              link: '/changes/ssr-using-modulerunner'
            },
            {
              text: 'Shared plugins during build',
              link: '/changes/shared-plugins-during-build'
            }
          ]
        },
        {
          text: 'Past',
          items: []
        }
      ]
    },

    outline: {
      level: [2, 3]
    }
  },
  transformPageData(pageData) {
    const canonicalUrl = `${ogUrl}/${pageData.relativePath}`
      .replace(/\/index\.md$/, '/')
      .replace(/\.md$/, '')
    pageData.frontmatter.head ??= []
    pageData.frontmatter.head.unshift(
      ['link', { rel: 'canonical', href: canonicalUrl }],
      ['meta', { property: 'og:title', content: pageData.title }]
    )
    return pageData
  },
  markdown: {
    codeTransformers: [transformerTwoslash()],
    config(md) {
      md.use(groupIconMdPlugin)
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          firebase: 'vscode-icons:file-type-firebase',
          '.gitlab-ci.yml': 'vscode-icons:file-type-gitlab'
        }
      })
    ],
    optimizeDeps: {
      include: [
        '@shikijs/vitepress-twoslash/client',
        'gsap',
        'gsap/dist/ScrollTrigger',
        'gsap/dist/MotionPathPlugin'
      ]
    }
  },
  buildEnd
})
