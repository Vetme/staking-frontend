import { Contract, InterfaceAbi, JsonRpcProvider } from "ethers";

import stakingAbi from "@/abi/staking.json"
import erc20Abi from "@/abi/erc20.json"
import multiCallAbi from "@/abi/multicall.json"
import rewardAbi from "@/abi/reward.json"

import { contracts } from "@/lib/constants";


export enum Blockchain {
    Eth = "eth",
    Goerli = "goerli",
}

export const readOnlyProvider = (rpc: string) =>
    new JsonRpcProvider(rpc);

export const defaultRPCs = {
    goerli: `https://rpc.ankr.com/eth_goerli`,
    eth: `https://rpc.ankr.com/eth`,
};

export function select_rpc_url(chain: Blockchain) {
    return defaultRPCs[chain];
}

const getContract = (
    abi: InterfaceAbi,
    contract_address: string,
    chain: Blockchain,
    provider?: any
): Contract => {
    const defaultProvider = readOnlyProvider(select_rpc_url(chain));
    return new Contract(contract_address, abi, provider ?? defaultProvider);
};

export const getStakingContract = (
    chain: Blockchain,
    provider?: any
): unknown => {
    return getContract(
        stakingAbi,
        contracts.staking[chain],
        chain,
        provider
    ) as unknown;
};


export const getRewardContract = (
    chain: Blockchain,
    provider?: any
): unknown => {
    return getContract(
        rewardAbi,
        contracts.reward[chain],
        chain,
        provider
    ) as unknown;
};


export const getERC20Contract = (
    contract_address: string,
    chain: Blockchain,
    provider?: any
): unknown => {
    return getContract(
        erc20Abi,
        contract_address,
        chain,
        provider
    ) as unknown;
};

export const getMulticallContract = (contract_address?: string,
    chain?: Blockchain,
    provider?: any) => {
    return getContract(multiCallAbi, contract_address as string, chain as any, provider)
}