import { ActionBtn, Input, InputBox, InputInner } from "@/components";
import Connect from "@/components/Modal/Connect";
import { canWithdraw, revertMatch } from "@/helpers";
import { getV2StakingContract } from "@/helpers/contract";
import { useContractFetch } from "@/hooks/useContractFetchV2";
import { useEthersSigner } from "@/hooks/useSigner";
import { createWithdraw } from "@/services/api";
import { useState } from "react";
import { useAccount, useChainId } from "wagmi";
import { toast } from "react-toastify";
import { Button } from "@/components/Button";

const Withdraw = () => {
  const [showConnect, setShowConnect] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState("");
  const { address, isConnected } = useAccount();
  const signer = useEthersSigner();
  const chainId: number = useChainId();

  const { loading, data } = useContractFetch({ chainId });

  const withdraw = async () => {
    setLoading(true);
    const contract: any = getV2StakingContract(1 as any, signer);
    try {
      alert(account);
      const tx = await contract.withdrawTo(account);
      await tx.wait();
      setLoading(false);

      await createWithdraw({
        account: address,
      });
    } catch (err: any) {
      const match = revertMatch(err);
      if (match) {
        toast.error(match[0] || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else if (err.includes("user rejected action")) {
        console.log("");
      } else {
        toast.error(err.message || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <div>Fetching..</div>}
      <div style={{ width: "474px", maxWidth: "100%" }}>
        <InputBox className="standard">
          <label htmlFor="">Account</label>
          <InputInner>
            <Input
              onChange={(e) => setAccount(e.target.value)}
              name="account"
              value={account}
              step={0.1}
              placeholder="ENTER WALLET ADDRESS"
              autoComplete="off"
              autoCorrect="off"
            />
          </InputInner>
        </InputBox>
      </div>
      <br />

      {isConnected ? (
        canWithdraw(data.w_pending) && (
          <ActionBtn disabled={isLoading || !account.length} onClick={withdraw}>
            Withdraw
          </ActionBtn>
        )
      ) : (
        <>
          <Button className="primary" onClick={() => setShowConnect(true)}>
            Connect Wallet
          </Button>
        </>
      )}

      <Connect show={showConnect} handleClose={() => setShowConnect(false)} />
    </div>
  );
};

export default Withdraw;
