<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { ethers } from "ethers";
import { useEnv } from "~/composables/useEnv";
import { useOnboard } from "@web3-onboard/vue";
import { useWallet } from "~/composables/useWallet";
import { asyncComputed } from "@vueuse/core";

const { chain, contractThump, contractBoden } = useEnv();

const toast = useToast();

const state = reactive({
  thumpMintAmount: 1,
  bodenMintAmount: 1,
  isMintingThump: false,
  isMintingBoden: false
});

const thumpMintCount = ref(0);
const bodenMintCount = ref(0);

import abi from "@/assets/abi.json";
import EthereumClient from "~/web3/EthereumClient";

const ethThump = new EthereumClient(contractThump, chain.rpcUrl, chain.id, abi);
const ethBoden = new EthereumClient(contractBoden, chain.rpcUrl, chain.id, abi);

const { connectedWallet } = useOnboard();
const { isConnected, getSigner } = useWallet();

const mintThump = async () => {
  state.isMintingThump = true;
  try {
    const signer = await getSigner();
    const price = await ethThump.getMintPrice();
    const cost = BigInt(state.thumpMintAmount) * price;
    const tx = await ethThump.contract.connect(signer).normalMint(await signer.getAddress(), {
      gasLimit: 700000, // Set a manual gas limit
    });
    await tx.wait();
    toast.clear()
    toast.add({
      id: 'success',
      ui: {
        background: 'bg-gray-800 dark:bg-gray-800'
      },
      color: 'green',
      title: 'Minted',
      description: `Your NFT has been minted successfully.`,
      icon: 'i-octicon-check-24',
      timeout: 5000,
    });
    state.isMintingThump = false;
    await fetchMintCounts();
  } catch (e) {
    console.error(e);
    toast.clear();
    toast.add({
      id: 'error',
      color: 'red',
      title: 'Error minting',
      description: `There was an error minting your NFT. Please try again.`,
      icon: 'i-octicon-alert-24',
      timeout: 5000,
    });
  }
  state.isMintingThump = false;
};

const mintBoden = async () => {
  state.isMintingBoden = true;
  try {
    const signer = await getSigner();
    const price = await ethBoden.getMintPrice();
    const cost = BigInt(state.bodenMintAmount) * price;
    const tx = await ethBoden.contract.connect(signer).normalMint(await signer.getAddress(), {
      gasLimit: 300000, // Set a manual gas limit
    });
    await tx.wait();
    toast.clear()
    toast.add({
      id: 'success',
      ui: {
        background: 'bg-gray-800 dark:bg-gray-800'
      },
      color: 'green',
      title: 'Minted',
      description: `Your NFT has been minted successfully.`,
      icon: 'i-octicon-check-24',
      timeout: 5000,
    });
    state.isMintingBoden = false;
    await fetchMintCounts();
  } catch (e) {
    console.error(e);
    toast.clear();
    toast.add({
      id: 'error',
      color: 'red',
      title: 'Error minting',
      description: `There was an error minting your NFT. Please try again.`,
      icon: 'i-octicon-alert-24',
      timeout: 5000,
    });
  }
  state.isMintingBoden = false;
};

const fetchMintCounts = async () => {
  try {
    thumpMintCount.value = await ethThump.contract.getNextTokenId();
    bodenMintCount.value = await ethBoden.contract.getNextTokenId();
  } catch (e) {
    console.error("Error fetching mint counts:", e);
  }
};

/**
 * @dev check if chain is correct.
 */
 const isChainCorrect = asyncComputed(async () => {
  const provider = connectedWallet.value?.provider as ethers.Eip1193Provider
  let check = false
  await provider.request({method: 'eth_chainId'}).then((_chainId: string) => {
    console.log("Chain ID: ", _chainId,)
    check = _chainId === chain.id
  })
  return check
})

watch(() => isChainCorrect.value, (val) => {
  console.log("ChainCorrect::", val);
  if (!val) {
    console.log(`Please switch to ${chain.label}`);
  } else {
    console.log('Correct chain detected');
  }
});

/**
 * @dev watch for chain change and change-action on notification.
 */
watch(() => isChainCorrect.value, (val) => {
  console.log("ChainCorrect::", val)
  if (!val) {
    toast.add({
      title: 'Wrong Chain',
      description: `Please switch to ${chain.label}`,
      color: 'yellow',
      timeout: 60000,
      actions: [
        {
          label: 'Switch',
          onClick: () => {
            const provider = connectedWallet.value?.provider as ethers.Eip1193Provider
            provider.request({method: 'wallet_switchEthereumChain', params: [{chainId: chain.id}]}).then(() => {
              toast.add({
                title: 'Chain Switched',
                description: `Switched to ${chain.label}`,
                color: 'green',
                timeout: 5000,
              })
            }).catch((error) => {
              toast.add({
                title: 'Chain Switch Failed',
                description: `Failed to switch to ${chain.label}`,
                color: 'red',
                timeout: 5000,
              })
            })
          }
        }
      ]
    })
  } else {
    toast.remove('Wrong Chain')
  }
})

onMounted(fetchMintCounts);
</script>

<template>
  <div class="header-container">
    <h2 class="sub-header">Price: Free</h2>
    <h2 class="sub-header">First to 200 ends mint.</h2>
    <h3 class="header2">Choose one to mint.  Additional attemps will fail.</h3>
  </div>
  <UContainer class="american-flag-background">
    <ClientOnly>
      <div class="mint-columns">
        <div class="mint-column">
          <h2 class="header">THUMP</h2>
          <p class="mint-count">{{ thumpMintCount }} Mints</p>
          <img src="@/assets/trump.png" alt="Thump Image" />
          <UForm :state="state">
            <UButton @click="mintThump" :loading="state.isMintingThump" :disabled="!isConnected || !isChainCorrect" class="mint-button">Mint Thump</UButton>
          </UForm>
        </div>
        <div class="mint-column">
          <h2 class="header">BODEN</h2>
          <p class="mint-count">{{ bodenMintCount }} Mints</p>
          <img src="@/assets/biden.png" alt="Boden Image" />
          <UForm :state="state">
            <UButton @click="mintBoden" :loading="state.isMintingBoden" :disabled="!isConnected || !isChainCorrect" class="mint-button">Mint Boden</UButton>
          </UForm>
        </div>
      </div>
    </ClientOnly>
  </UContainer>
  <UContainer>
    <div class="text-center text-sm text-gray-500 p-6">
      <h3>Web3 Starter template by <a class="text-primary" href="https://x.com/abstrucked">Abstrucked.eth</a></h3>
      <br>
      <p>&copy; 2024</p>
    </div>
    </UContainer>
</template>

<script lang="ts">
// Force light mode
definePageMeta({
  colorMode: 'light'
})
</script>

<style scoped>
@font-face {
  font-family: 'Minecraftia';
  src: url('../assets/Minecraftia.ttf') format('truetype');
}

.header-container {
  text-align: center;
  margin-bottom: 20px;
}

.main-header {
  font-size: 3em;
  color: blue;
}

.sub-header {
  font-family: 'Minecraftia', sans-serif;
  font-size: 1.0em;
  color: blue;
}

.american-flag-background {
  background: repeating-linear-gradient(
    0deg,
    #ff0000,
    #ff0000 20px,
    #ffffff 20px,
    #ffffff 40px
  );
  padding: 20px;
}

.mint-columns {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.mint-column {
  flex: 1;
  margin: 0 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

img {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 20px;
}

.header {
  color: #1d4ed8; /* Tailwind CSS blue-700 color */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  font-size: 2em;
}

.header2 {
  display: inline-block;
  font-size: 1em;
  color: blue; /* Adjust the color as needed */
  background-color: white;
  font-weight: bold;
  padding: 10px;
  border: 2px solid red;
  margin-top: 10px;
}

.mint-count {
  font-size: 2em;
  font-weight: bold;
  color: #1d4ed8;
}

.mint-button {
  background-color: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
  color: white;
}

.mint-button:hover {
  background-color: #3b82f6 !important;
  border-color: #3b82f6 !important;
}

@media (max-width: 768px) {
  .mint-columns {
    flex-direction: column;
  }

  .mint-column {
    margin: 10px 0;
  }

  .sub-header {
    font-size: 0.8em;
  }

  .header-container {
    padding: 10px;
  }
  

}
</style>
