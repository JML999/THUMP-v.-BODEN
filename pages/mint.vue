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
      value: cost,
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
      value: cost,
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
  <UContainer class="american-flag-background">
    <ClientOnly>
      <div class="info-section">
            <h2 class="sub-header">Price: Free</h2>
            <h2 class="sub-header">First to 200 Mints.</h2>
            <h3 class="sub-header">One mint from either collection per wallet.</h3>
          </div>
      <div class="mint-columns">
        <div class="mint-column">
          <h2 class="header">Thump</h2>
          <p class="mint-count">{{ thumpMintCount }} Votes</p>
          <img src="@/assets/trump.png" alt="Thump Image" />
          <UForm :state="state">
            <UInput v-model="state.thumpMintAmount" label="Amount" :disabled="state.isMintingThump" />
            <UButton @click="mintThump" :loading="state.isMintingThump" :disabled="!isConnected || !isChainCorrect" class="mint-button">Mint Thump</UButton>
          </UForm>
        </div>
        <div class="mint-column">
          <h2 class="header">Boden</h2>
          <p class="mint-count">{{ bodenMintCount }} Votes</p>
          <img src="@/assets/biden.png" alt="Boden Image" />
          <UForm :state="state">
            <UInput v-model="state.bodenMintAmount" label="Amount" :disabled="state.isMintingBoden" />
            <UButton @click="mintBoden" :loading="state.isMintingBoden" :disabled="!isConnected || !isChainCorrect" class="mint-button">Mint Boden</UButton>
          </UForm>
        </div>
      </div>
    </ClientOnly>
  </UContainer>
</template>

<style scoped>
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
}

.mint-column {
  flex: 1;
  margin: 0 10px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  border-radius: 10px;
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

.mint-count {
  font-size: 2em;
  font-weight: bold;
  color: #1d4ed8;
}

.mint-button {
  background-color: #1d4ed8;
  border-color: #1d4ed8;
  color: white;
}

.mint-button:hover {
  background-color: #3b82f6;
  border-color: #3b82f6;
}
</style>