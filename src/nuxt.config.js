import path from 'path';
const pkg = require('./package');

module.exports = {
  mode: 'universal',
  publicPath: 'public',
  buildDir: '../functions/nuxt',

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
    path.resolve(__dirname, 'assets/styles/settings/variables.scss'),
    path.resolve(__dirname, 'assets/styles/mixins/media-queries.scss'),
    path.resolve(__dirname, 'assets/styles/global/typography.scss'),
    path.resolve(__dirname, 'assets/styles/global/index.scss'),
  ],

  plugins: ['~/plugins/element-ui', '~/plugins/firebase'],
  modules: [
    '@nuxtjs/axios',
    [
      '@nuxtjs/dotenv',
      {
        systemvars: true,
        path: '../',
      },
    ],
    'nuxt-sass-resources-loader',
  ],

  env: {
    FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_API_KEY,
    FIREBASE_DB_URL: process.env.FIREBASE_API_KEY,
    FIREBASE_PROJECT_ID: process.env.FIREBASE_API_KEY,
    FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_API_KEY,
    FIREBASE_MESSAGEING_SENDER: process.env.FIREBASE_API_KEY,
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
