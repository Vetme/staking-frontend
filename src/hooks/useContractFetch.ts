import { useEffect, useState } from 'react'
import { useEthersProvider } from './useProvider';
import { getStakingContract } from '@/helpers/contract';
import { useAccount } from 'wagmi';

export function useContractFetch({ chainId }: { chainId?: number } = {}) {
    const [loading, setLoading] = useState<boolean>(false)
    const { isConnected, address } = useAccount();
    const provider = useEthersProvider()
    const [data, setData] = useState<any>({
        balanceOf: "",
        duration: "",
        totalForStake: "",
        finishAt: "",
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
            setData({
                balanceOf,
                duration,
                totalForStake,
                finishAt
            })
            setLoading(false)
        } catch (error: any) {
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
