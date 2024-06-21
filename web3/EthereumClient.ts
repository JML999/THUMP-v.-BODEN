import { ethers } from 'ethers';
import abi from '@/assets/abi.json';

declare interface IEthereumClient {
  provider: ethers.JsonRpcProvider;
  contract: ethers.Contract;

  getMintPrice(): Promise<ethers.BigNumber>;
  mint(signer: ethers.Signer, amount: number, cost: ethers.BigNumber): Promise<ethers.ContractTransaction>;
}

/**
 * EthereumClient
 * @param contractAddress - The contract address
 * @param rpcUrl - The RPC URL
 * @param chainId - The chain ID
 * @param contractABI - The contract ABI
 * @returns {IEthereumClient}
 */
export default class EthereumClient implements IEthereumClient {
  provider: ethers.JsonRpcProvider;
  contract: ethers.Contract;

  constructor(contractAddress: string, rpcUrl: string, chainId: number | string, contractABI: any = abi) {
    if (typeof chainId !== 'number') {
      chainId = parseInt(chainId);
    }
    console.log(`Initializing EthereumClient for ${contractAddress}`);
    this.provider = new ethers.JsonRpcProvider(rpcUrl, chainId);
    this.contract = new ethers.Contract(contractAddress, contractABI, this.provider);
  }

  async getMintPrice() {
    return ethers.parseUnits('0.005', 'ether'); // 0.005 ether
  }

  async mint(signer, amount, cost) {
    const tx = await this.contract.connect(signer).normalMint(signer.getAddress(), { value: cost });
    return tx;
  }
}
