import path from 'path';
import pkg from './package';

module.exports = {
  mode: 'universal',
  srcDir: 'src',

  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  loading: { color: '#fff' },
  css: ['element-ui/lib/theme-chalk/index.css', 'normalize.css'],
  sassResources: [
    path.resolve(__dirname, 'src/assets/styles/settings/variables.scss'),
    path.resolve(__dirname, 'src/assets/styles/mixins/media-queries.scss'),
    path.resolve(__dirname, 'src/assets/styles/global/typography.scss'),
    path.resolve(__dirname, 'src/assets/styles/global/index.scss'),
  ],

  plugins: ['~/plugins/element-ui'],
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/dotenv',
      {
        systemvars: true,
        path: './',
      },
    ],
    'nuxt-sass-resources-loader',
    'nuxt-fire',
  ],

  fire: {
    customEnv: true,
    useOnly: ['auth', 'firestore', 'functions', 'storage', 'realtimeDb'],
    config: {
      dotEnv: {
        apiKey: process.env.FIRE_API_KEY,
        authDomain: process.env.FIRE_AUTH_DOMAIN,
        databaseURL: process.env.FIRE_DB_URL,
        projectId: process.env.FIRE_PROJECT_ID,
        storageBucket: process.env.FIRE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIRE_MESSAGEING_SENDER,
      },
    },
  },

  env: {
    FIRE_API_KEY: process.env.FIRE_API_KEY,
    FIRE_AUTH_DOMAIN: process.env.FIRE_AUTH_DOMAIN,
    FIRE_DB_URL: process.env.FIRE_DB_URL,
    FIRE_PROJECT_ID: process.env.FIRE_PROJECT_ID,
    FIRE_STORAGE_BUCKET: process.env.FIRE_STORAGE_BUCKET,
    FIRE_MESSAGEING_SENDER: process.env.FIRE_MESSAGEING_SENDER,
  },

  build: {
    extractCSS: true,
    cssSourceMap: true,
    optimization: {
      splitChunks: {
        name: true,
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },

  generate: {
    fallback: true,
  },

  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: [
      [
        'transform-runtime',
        {
          polyfill: true,
          regenerator: true,
        },
      ],
    ],
  },

  vendor: ['axios', 'babel-polyfill'],
};
