// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/image"],
  colorMode: {
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      env: process.env.NUXT_NODE_ENV || 'development', // default to development if not set
      contractThump: process.env.NUXT_NODE_ENV === 'production' ? process.env.NUXT_MAINNET_CONTRACT_THUMP : process.env.NUXT_TESTNET_CONTRACT_THUMP,
      contractBoden: process.env.NUXT_NODE_ENV === 'production' ? process.env.NUXT_MAINNET_CONTRACT_BODEN : process.env.NUXT_TESTNET_CONTRACT_BODEN,
    }
  }
});
