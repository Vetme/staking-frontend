import { useEffect, useState } from 'react'
import { useEthersProvider } from './useProvider';
import { getStakingContract } from '@/helpers/contract';
import { useAccount } from 'wagmi';

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
        rewarded: false
    });
    const [errors, setError] = useState([]);

    const getData = async () => {
        setLoading(true)
        const contract: any = getStakingContract(
            chainId as any,
            provider
        )


        try {
            if (!isConnected) throw Error('Wallet not connected')
            const balanceOf = await contract.balanceOf(address)
            const duration = await contract.duration()
            const totalForStake = await contract.totalForStake()
            const finishAt = await contract.finishAt()
            const w_pending = await contract.withdraw_pending(address)
            const totalReward = await contract.totalReward()
            const rewarded = await contract.rewarded(address)
            console.log(rewarded, totalForStake)

            setData({
                balanceOf,
                duration,
                totalForStake,
                finishAt,
                w_pending,
                totalReward,
                rewarded
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
