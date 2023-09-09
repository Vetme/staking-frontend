import { ethers } from 'ethers'
import { MultiCallResponse } from '@/types'
import { getMulticallContract } from './contract'
import { useEthersProvider } from '@/hooks/useProvider'
// import { useEthersSigner } from '@/hooks/useSigner'

export interface Call {
    address: string // Address of the contract
    name: string // Function name on the contract (example: balanceOf)
    params?: any[] // Function params
}

interface MulticallOptions {
    requireSuccess?: boolean
}

const multicall = async <T = any>(abi: any[], calls: Call[]): Promise<T> => {
    try {
        const multi = getMulticallContract()
        const itf = new ethers.Interface(abi)

        const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
        const { returnData } = await multi.aggregate(calldata)

        const res = returnData.map((call: any, i: number) => itf.decodeFunctionResult(calls[i].name, call))

        return res
    } catch (error: any) {
        throw new Error(error)
    }
}

/**
 * Multicall V2 uses the new "tryAggregate" function. It is different in 2 ways
 *
 * 1. If "requireSuccess" is false multicall will not bail out if one of the calls fails
 * 2. The return inclues a boolean whether the call was successful e.g. [wasSuccessful, callResult]
 */
export const useMulticallv2 = async <T = any>(
    abi: any[],
    calls: Call[],
    options: MulticallOptions = { requireSuccess: true },
): Promise<MultiCallResponse<T>> => {
    const provider = useEthersProvider();

    const { requireSuccess } = options
    const multi = getMulticallContract('0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696', 5 as any, provider)
    const itf = new ethers.Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    const returnData = await multi.tryAggregate(requireSuccess, calldata)

    const res = returnData.map((call: any, i: any) => {
        const [result, data] = call
        return result ? itf.decodeFunctionResult(calls[i].name, data) : null
    })
    return res
}

export default multicall
