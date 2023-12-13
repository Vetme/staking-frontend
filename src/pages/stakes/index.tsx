import { Spacer } from "@/components";
import StackingAds from "@/components/StackingAds";
import { computeUsdPrice, fromBigNumber } from "@/helpers";
import { useStakesFetch } from "@/hooks/useContractFetch";
import { stakingToken } from "@/lib/constants";
import { useChainId } from "wagmi";

const AllStakes = () => {
  const { loading, data } = useStakesFetch();
  const chainId: number = useChainId();

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  console.log(data);

  return (
    <div>
      <div className="h-screen ">
        <div className="container">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-md border border-[#170728]">
            <h2 className="text-2xl font-bold mb-4">User Stakes</h2>

            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="border px-4 py-2">Address</th>
                  <th className="border px-4 py-2">Amount (VetMe)</th>
                  <th className="border px-4 py-2">Amount ($)</th>
                </tr>
              </thead>
              <tbody>
                {data.map((stake: any, i: number) => (
                  <tr key={i}>
                    <td className="border px-4 py-2">{stake.address}</td>
                    <td className="border px-4 py-2">
                      {" "}
                      {fromBigNumber(
                        stake.amount,
                        stakingToken[chainId].decimal
                      ).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 whitespace-nowrap">
                      $
                      {computeUsdPrice(
                        stake?.usd,
                        fromBigNumber(
                          stake.amount,
                          stakingToken[chainId].decimal
                        )
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <Spacer height={50} />
      </div>
    </div>
  );
};

export default AllStakes;
