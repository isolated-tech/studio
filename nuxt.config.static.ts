// Static configuration for i18nlocale to run at isolated.tech/i18n/demo
// Copy this file to /Users/codybontecou/dev/i18n-ai/nuxt.config.static.ts

import { languages } from './lib/constants'

export default defineNuxtConfig({
    // Extend the base config
    ssr: true,
    
    // Set base paths for subdirectory deployment
    app: {
        baseURL: '/i18n/demo/',
        buildAssetsDir: '_nuxt/',
    },
    
    // Configure for static generation
    nitro: {
        preset: 'static',
        baseURL: '/i18n/demo',
    },
    
    devtools: { enabled: false },
    
    // Modules - remove auth for static deployment
    modules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/i18n',
        // '@sidebase/nuxt-auth', // Disabled for static deployment
        'shadcn-nuxt',
        '@pinia/nuxt',
        'nuxt-icon',
        // 'nuxt-gtag', // Optional: disable analytics for demo
        '@nuxt/content',
    ],
    
    i18n: {
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'nuxt_i18n',
        },
        defaultLocale: 'eng_Latn',
        locales: languages
            .filter(l => l.code !== 'all')
            .map(l => {
                return {
                    code: l.code,
                    name: l.title,
                }
            }),
        vueI18n: './i18n.config.ts',
    },
    
    // Simplified runtime config for static deployment
    runtimeConfig: {
        public: {
            BASE_URL: 'https://isolated.tech/i18n/demo',
        },
    },
    
    // Pre-render all routes
    generate: {
        routes: [
            '/',
            '/get-started',
            '/input', 
            '/output',
            '/translate',
            '/blog',
            '/blog/new-file-formats',
            // Exclude auth-dependent routes
            // '/login',
            // '/success', 
            // '/cancelled',
            '/privacy',
            '/tos',
        ]
    },
    
    // Disable features that require server
    experimental: {
        payloadExtraction: false,
        appManifest: false,
    },
    
    // Ensure content works in static mode
    content: {
        documentDriven: false, // Disable document driven mode for static
    },
})