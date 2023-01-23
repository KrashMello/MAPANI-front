export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s",
    title: "MAPANI",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [{ src: "~assets/css/style.css", lang: "css" }],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/mask"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/stylelint
    "@nuxtjs/stylelint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    //nuxt socket io
    "nuxt-socket-io",
    "cookie-universal-nuxt",
  ],

  io: {
    sockets: [
      // Required
      { name: "main", url: "https://mapani-back.onrender.com", default: true },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
    proxy: true,
  },
  proxy: {
    "/api/": {
      target: "https://mapani-back.onrender.com",
      pathRewrite: { "^/api/": "" },
      changeOrigin: true,
    },
    // '/api2/': 'http://api.another-website.com'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en",
    },
  },

  router: {
    middleware: ["authenticated"],
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: "#6eb532",
          accent: "#21360f",
          secondary: "#8bc45b",
          info: "#90A4AE",
          warning: "#ed9c28",
          error: "#d2322d",
          success: "#47a447",
          danger: "#d2322d",
        },
        light: {
          primary: "#6eb532",
          accent: "#21360f",
          secondary: "#fff",
          info: "#90A4AE",
          warning: "#ed9c28",
          error: "#d2322d",
          success: "#47a447",
          danger: "#d2322d",
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
  },
};
