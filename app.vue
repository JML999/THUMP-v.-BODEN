<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
import {init} from '@web3-onboard/vue'
import type {AppMetadata} from "@web3-onboard/common";
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWallet from '@web3-onboard/coinbase';
import {hychain, hychainTestnet} from "~/web3/chains";
import type {OnboardAPI} from "@web3-onboard/core";

const injected = injectedModule()
const coinbase = coinbaseWallet()

const web3Onboard = ref(null as OnboardAPI)

const appMetadata: AppMetadata = {
  name: 'Project Name',
  description: 'Project Description',
}

web3Onboard.value = init({
  wallets: [injected, coinbase],
  chains: [hychain, hychainTestnet],
  appMetadata: appMetadata,
  theme: 'light',
  connect: {
    autoConnectLastWallet: true,
    showSidebar: false,
    removeWhereIsMyWalletWarning: true
  }
})
// console.log("web3Onboard", web3Onboard)

</script>
<template>
  <div class="main-layout">
    <Header/>
    <main class="content p-1 md:p-3 lg:p-7 h-80">
      <NuxtPage/>
      <UNotifications/>

    </main>
    <Footer/>
  </div>
</template>

<script lang="ts">
// Force light mode
definePageMeta({
  colorMode: 'light'
})
</script>

<style>
body {
  background-color: #f8f9fa; /* Set a light background color */
  color: #212529; /* Set a contrasting text color */
}

html {
  --tw-bg-opacity: 1;
  background-color: rgba(255, 255, 255, var(--tw-bg-opacity)); /* Force light background */
}

@font-face {
  font-family: 'Minecraftia';
  src: url('~/assets/Minecraftia.ttf') format('truetype');
}

* {
  font-family: 'Minecraftia', sans-serif;
}
</style>