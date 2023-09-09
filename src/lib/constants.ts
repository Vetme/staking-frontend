import { goerli, mainnet } from "wagmi/chains";


export const WEB3_MODEL_PROJECT_ID = import.meta.env.VITE_WEB3_MODEL_PROJECT_ID;

export const chains = [mainnet, goerli];

export const contracts: any = {
    staking: {
        5: import.meta.env.VITE_CONTRACT_ADDRESS,
    },
    token: {
        5: import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS,
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
        address: contracts.token[5]
    },
    1: {
        decimal: 18,
        symbol: 'XYZ',
        name: 'XYZ Token',
        address: contracts.token[5]
    },

}