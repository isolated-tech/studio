// Configuration for building i18nlocale as static site
// This file should be copied to /Users/codybontecou/dev/i18n-ai/nuxt.config.static.ts before building

export default defineNuxtConfig({
    extends: './nuxt.config.ts',
    ssr: true,
    nitro: {
        preset: 'static',
        baseURL: '/i18n/demo',
        prerender: {
            routes: [
                '/',
                '/get-started',
                '/input',
                '/output',
                '/translate',
                '/login',
                '/success',
                '/cancelled',
                '/privacy',
                '/tos',
                '/blog',
            ]
        }
    },
    app: {
        baseURL: '/i18n/demo/',
        buildAssetsDir: '_nuxt/',
        cdnURL: ''
    },
    experimental: {
        payloadExtraction: false
    }
})