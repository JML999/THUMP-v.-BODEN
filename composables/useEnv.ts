import { hychain, hychainTestnet } from "~/web3/chains";
import { ethers } from "ethers";
import { isChain } from "~/web3/chains";

export const useEnv = () => {
  const config = useRuntimeConfig().public;
  const chain = config.env === 'production' ? hychain : hychainTestnet;

  const contractThump = config.contractThump;
  const contractBoden = config.contractBoden;

  // Adding console logs to check the environment variables
  console.log('Environment:', config.env);
  console.log('RPC URL:', config.rpcUrl);
  console.log('Contract Thump:', contractThump);
  console.log('Contract Boden:', contractBoden);

  if (!ethers.isAddress(contractThump) || !ethers.isAddress(contractBoden)) {
    throw new Error('Invalid contract addresses, check the .env file');
  }
  if (!isChain(chain)) {
    throw new Error('Invalid chain object, check the web3/chains.ts file');
  }

  return {
    chain,
    contractThump,
    contractBoden
  };
};

