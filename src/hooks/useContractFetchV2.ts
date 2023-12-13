import { useEffect, useState } from 'react'
import { useEthersProvider } from './useProvider';
import { getRewardContract, getV2StakingContract } from '@/helpers/contract';
import { useAccount } from 'wagmi';
import { stakingToken } from '@/lib/constants';

export function useContractFetch({ chainId, staked }: { chainId?: number, staked?: boolean } = {}) {
    const [loading, setLoading] = useState<boolean>(false)
    const { isConnected, address } = useAccount();
    const provider = useEthersProvider()
    const [data, setData] = useState<any>({
        balanceOf: "",
        duration: "",
        totalForStake: 0,
        finishAt: "",
        w_pending: 0,
        totalReward: 0,
        rewarded: false,
        totalSupply: 0,
        usd: 0
    });
    const [errors, setError] = useState([]);

    const getData = async () => {
        setLoading(true)
        const contract: any = getV2StakingContract(
            chainId as any,
            provider
        )


        try {
            if (!isConnected) throw Error('Wallet not connected')
            const duration = await contract.duration()
            const totalForStake = await contract.totalForStake()
            const finishAt = await contract.finishAt()
            const w_pending = await contract.withdraw_pending(address)
            const totalSupply = await contract.totalSupply()
            const totalReward = await contract.totalReward()

            const res = await fetch(`https://api.coingecko.com/api/v3/coins/ethereum/contract/${stakingToken[chainId as number].address}`)
            const token = await res.json()

            setData({
                duration,
                totalForStake,
                finishAt,
                w_pending,
                totalSupply,
                totalReward,
                usd: token?.market_data?.current_price?.usd || 0
            })

            setLoading(false)
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            setError(error.message || "Something went wrong")
        }

    }

    useEffect(() => {
        getData()
    }, [address, staked])


    return {
        loading,
        data,
        errors
    }
}



export function useRContractFetch({ chainId }: { chainId?: number } = {}) {
    const [loading, setLoading] = useState<boolean>(false)
    const { isConnected, address } = useAccount();
    const provider = useEthersProvider()
    const [data, setData] = useState<any>({
        totalForStake: 0,
        totalReward: 0,
        rewarded: false,
    });
    const [errors, setError] = useState([]);

    const getData = async () => {
        setLoading(true)
        const contract: any = getRewardContract(
            chainId as any,
            provider
        )

        try {
            if (!isConnected) throw Error('Wallet not connected')
            const totalReward = await contract.totalReward()
            const rewarded = await contract.rewarded(address)

            setData({
                totalReward,
                rewarded,
            })
            setLoading(false)
        } catch (error: any) {
            console.log(error)
            setLoading(false)
            setError(error.message || "Something went wrong")
        }

    }

    useEffect(() => {
        getData()
    }, [address])


    return {
        loading,
        data,
        errors
    }
}
