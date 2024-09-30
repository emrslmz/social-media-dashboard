
export default defineNuxtConfig({
    ssr: false,
    devtools: {enabled: true},
    modules: ['@nuxtjs/tailwindcss'],
    compatibilityDate: '2024-09-28',
    css: ['@/assets/css/tailwind.css', '@/assets/css/main.css'],
    plugins: [
        '@/plugins/pinia.js'
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        public: {
            API_TWITTER_KEY: process.env.API_TWITTER_KEY,
            API_TWITTER_URL: process.env.API_TWITTER_URL,
            API_TWITTER_HOST: process.env.API_TWITTER_HOST,

            API_INSTAGRAM_KEY: process.env.API_INSTAGRAM_KEY,
            API_INSTAGRAM_URL: process.env.API_INSTAGRAM_URL,
            API_INSTAGRAM_HOST: process.env.API_INSTAGRAM_HOST,

            API_FACEBOOK_KEY: process.env.API_FACEBOOK_KEY,
            API_FACEBOOK_URL: process.env.API_FACEBOOK_URL,
            API_FACEBOOK_HOST: process.env.API_FACEBOOK_HOST

        }
    },
})