import { goerli, mainnet } from "wagmi/chains";


export const WEB3_MODEL_PROJECT_ID = import.meta.env.VITE_WEB3_MODEL_PROJECT_ID;

export const chains = [mainnet, goerli];

export const contracts: any = {
    staking: {
        5: import.meta.env.VITE_G_CONTRACT_ADDRESS,
        1: import.meta.env.VITE_CONTRACT_ADDRESS,
    },
    reward_token: {
        5: import.meta.env.VITE_G_REWARD_TOKEN_CONTRACT_ADDRESS,
        1: import.meta.env.VITE_REWARD_TOKEN_CONTRACT_ADDRESS,
    },
    staking_token: {
        5: import.meta.env.VITE_G_STAKING_TOKEN_CONTRACT_ADDRESS,
        1: import.meta.env.VITE_STAKING_TOKEN_CONTRACT_ADDRESS,
    },
    multicall: {
        5: import.meta.env.VITE_GOERLI_MULTICALL_CONRACT_ADDRESS
    }
}

export const stakingToken: Record<number, {
    decimal: number;
    symbol: string;
    name: string;
    address: string;
}> = {
    5: {
        decimal: 18,
        symbol: 'XYZ',
        name: 'XYZ Token',
        address: contracts.staking_token[5]
    },
    1: {
        decimal: 9,
        symbol: 'VetMe',
        name: 'VetMe',
        address: contracts.staking_token[1]
    },

}


export const rewardToken: Record<number, {
    decimal: number;
    symbol: string;
    name: string;
    address: string;
}> = {
    5: {
        decimal: 6,
        symbol: 'USDT',
        name: 'Tether USD',
        address: contracts.reward_token[5]
    },
    1: {
        decimal: 6,
        symbol: 'USDT',
        name: 'Tether USD',
        address: contracts.reward_token[5]
    },

}
export const BaseURL = import.meta.env.MODE
    == "production"
    ? import.meta.env.VITE_BASE_URL_PRODUCTION
    : import.meta.env.VITE_BASE_URL_DEVELOPMENT;
