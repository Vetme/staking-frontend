import styled from "styled-components";
import { ActionBtn, Flex, Spacer, Text } from "..";
import { ReactNode, useState } from "react";
// import InfoBox from "../InfoBox";
import { ArrowRight } from "../Icons";
import { motion, AnimatePresence } from "framer-motion";
import { getV2StakingContract } from "@/helpers/contract";
import { rewardToken, stakingToken } from "@/lib/constants";
import { useAccount, useChainId } from "wagmi";
import { useEthersSigner } from "@/hooks/useSigner";
import {
  canWithdraw,
  computeUsdPrice,
  fromBigNumber,
  getDateFromSeconds,
  getRemaining,
  // getReward,
  getStakePercent,
  getStatus,
  isPending,
  revertMatch,
} from "@/helpers";
import { toast } from "react-toastify";
import { createWithdraw } from "@/services/api";
// import { Button } from "../Button";

const overlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
  },
};

const container = {
  hidden: { opacity: 0, y: -100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    y: -100,
  },
};

const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  z-index: 99999;
  background: rgba(242, 255, 245, 0.7);
`;

const SInner = styled.div`
  width: 588px;
  max-width: 95%;
  padding: 50px 41px 50px 41px;
  height: 814.91px;
  /* margin: auto; */
  background-image: url(/images/bg/staked.svg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100%;
  margin: auto;
  top: 5%;
  position: relative;

  @media (max-width: 640px) {
    height: auto;
    background-image: url(/images/bg/staked-m.svg);
    background: #fff;
    padding: 50px 5px 50px 5px;
  }
`;

const Close = styled.div`
  position: absolute;
  width: 60px;
  height: 60px;
  right: 0px;
  top: 0px;
  background: #170728;
  border: 1px solid #453953;
  border-radius: 12px;
  display: grid;
  place-content: center;
  cursor: pointer;

  @media (max-width: 640px) {
    width: 40px;
    height: 40px;
    top: -3px;
    right: -2px;
    border-radius: 6px;
  }
`;

const Anc = styled.div`
  position: absolute;
  left: 84px;
  top: 5px;

  @media (max-width: 640px) {
    left: 48px;
    top: -5px;
  }
`;
const Contain = styled.div`
  padding: 10px;
  display: flex;
  /* align-items: center; */
  flex-direction: column;
  height: 100%;
`;

const StakedCon = styled.div`
  height: 100%;
`;

const SItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 33px;
  margin: 12px 0px;
  @media (max-width: 640px) {
    height: 50px;
  }

  span {
    font-size: 15px !important;
  }

  &.sd {
    margin: 10px 0px;
    border-bottom: none;

    color: #fff;
  }
`;
const SDetials = styled.div`
  background: #170728;
  padding: 20px;
  border-radius: 10px;
  margin: 18px 0px 32px 0px;
`;

const Issue = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  background: #eff1ea;
  padding: 23px 27px;
  cursor: pointer;
`;

interface IModal {
  handleClose: () => void;
  show: boolean;
  children: ReactNode;
}

const Modal = ({ children, handleClose, show }: IModal) => {
  return (
    <AnimatePresence>
      {show && (
        <Container
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          as={motion.div}
          onClick={handleClose}
        >
          {children}
        </Container>
      )}
    </AnimatePresence>
  );
};

export default Modal;

export const MainStakedModal = ({
  handleClose,
  show,
  data,
  revalidate,
  stake,
}: {
  handleClose: () => void;
  show: boolean;
  data: any;
  revalidate: () => void;
  stake: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const chainId: number = useChainId();
  const { address } = useAccount();

  // const provider = useEthersProvider();
  const signer = useEthersSigner();

  // const unstake = async () => {
  //   setLoading(true);
  //   const contract: any = getV2StakingContract(chainId as any, signer);
  //   try {
  //     const tx = await contract.withdraw();
  //     setLoading(false);
  //     const receipt = await tx.wait();
  //     //  renderSuccess("Approved");
  //     console.log(receipt);
  //   } catch (err: any) {
  //     toast.error(err.message || err.reason || "Opps, something went wrong!", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });
  //     setLoading(false);
  //   }
  // };

  const requestWithdraw = async () => {
    setLoading(true);
    const contract: any = getV2StakingContract(chainId as any, signer);
    try {
      const tx = await contract.requestWithdraw();
      await tx.wait();

      setLoading(false);
      revalidate();
      toast.success(
        "Request Sent, You will be able to withdraw you funds in 24h",
        {
          position: toast.POSITION.TOP_RIGHT,
        }
      );
      //  renderSuccess("Approved");
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

  const cancelRequest = async () => {
    setLoading(true);
    const contract: any = getV2StakingContract(chainId as any, signer);
    try {
      const tx = await contract.cancelWithdrawRequest();
      const receipt = await tx.wait();
      setLoading(false);
      revalidate();
      toast.success("Request Cancel", {
        position: toast.POSITION.TOP_RIGHT,
      });
      console.log(receipt);
      //  renderSuccess("Approved");
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

  const withdraw = async () => {
    setLoading(true);
    const contract: any = getV2StakingContract(chainId as any, signer);
    try {
      const tx = await contract.withdraw();
      await tx.wait();
      setLoading(false);

      await createWithdraw({
        account: address,
      });
      revalidate();
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

  // const claimReward = async () => {
  //   setLoading(true);
  //   const contract: any = getV2StakingContract(chainId as any, signer);

  //   try {
  //     const tx = await contract.claimReward();
  //     const receipt = await tx.wait();
  //     setLoading(false);

  //     await createReward({
  //       amount: data.reward,
  //       transactionHash: receipt.hash,
  //       account: address,
  //     });

  //     toast.success("Claim Transaction successfully submitted.", {
  //       position: toast.POSITION.TOP_RIGHT,
  //     });

  //     // toast.success("Your address has been recorded for a reward snapshot.", {
  //     //   position: toast.POSITION.TOP_RIGHT,
  //     // });
  //   } catch (err: any) {
  //     const match = revertMatch(err);
  //     if (match) {
  //       toast.error(match[0] || "Opps, something went wrong!", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     } else if (err.includes("user rejected action")) {
  //       console.log("");
  //     } else {
  //       toast.error(err.message || "Opps, something went wrong!", {
  //         position: toast.POSITION.TOP_RIGHT,
  //       });
  //     }
  //     setLoading(false);
  //   }
  // };

  return (
    <Modal {...{ handleClose, show }}>
      <SInner
        variants={container}
        initial="hidden"
        animate="visible"
        exit="exit"
        as={motion.div}
        onClick={(e) => e.stopPropagation()}
      >
        <Close onClick={handleClose}>
          <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.79355 9.4998L2.42959 3.13584L3.1367 2.42873L9.50066 8.79269L15.8644 2.42893L16.5715 3.13604L10.2078 9.4998L16.5717 15.8638L15.8646 16.5709L9.50066 10.2069L3.1365 16.5711L2.42939 15.864L8.79355 9.4998Z"
              fill="white"
            />
          </svg>
        </Close>
        <Anc>
          <svg
            width="31"
            height="16"
            viewBox="0 0 31 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_50_9078)">
              <path
                d="M20.3665 15.9995C22.375 15.9996 24.3081 15.2263 25.7735 13.8366C27.2388 12.4469 28.1265 10.545 28.2562 8.51715L31 8.51715L31 7.48189L28.2562 7.48189C28.1637 6.02971 27.6814 4.63057 26.8612 3.43524C26.0409 2.23991 24.9138 1.29371 23.6013 0.698579C22.2889 0.103452 20.8408 -0.118034 19.4131 0.0579871C17.9854 0.234008 16.6322 0.800863 15.4994 1.69747C14.3667 0.800768 13.0136 0.233831 11.586 0.057766C10.1583 -0.118299 8.71025 0.103183 7.39783 0.698343C6.08541 1.2935 4.9584 2.23977 4.13828 3.43516C3.31816 4.63055 2.83602 6.02972 2.74383 7.48189L-3.27087e-07 7.48189L-3.72339e-07 8.51714L2.74383 8.51714C2.83602 9.96931 3.31815 11.3685 4.13828 12.5639C4.9584 13.7593 6.0854 14.7055 7.39783 15.3007C8.71025 15.8959 10.1583 16.1173 11.586 15.9413C13.0136 15.7652 14.3667 15.1983 15.4994 14.3016C16.8877 15.4037 18.6019 16.0017 20.3665 15.9995ZM25.2347 12.9251C24.069 14.1047 22.5235 14.8217 20.8793 14.9457C19.2352 15.0696 17.6017 14.5923 16.276 13.6006C17.6036 12.234 18.4005 10.4295 18.5209 8.51714L27.2307 8.51714C27.111 10.1815 26.4023 11.7465 25.2347 12.9251ZM13.5035 7.48189C13.6232 5.81684 14.3318 4.25115 15.4994 3.07162C16.6668 4.25127 17.3749 5.81697 17.4942 7.48189L13.5035 7.48189ZM17.4954 8.51714C17.3761 10.1821 16.6679 11.7478 15.5006 12.9274C14.3329 11.7479 13.6243 10.1822 13.5046 8.51714L17.4954 8.51714ZM25.2347 3.07394C26.4028 4.25317 27.1115 5.81903 27.2307 7.48421L18.5209 7.48421C18.4005 5.57189 17.6036 3.76735 16.276 2.40079C17.6017 1.40905 19.2352 0.931744 20.8793 1.05571C22.5235 1.17967 24.069 1.89667 25.2347 3.07626L25.2347 3.07394ZM5.76411 3.07394C6.92993 1.89405 8.47569 1.17686 10.1201 1.05289C11.7645 0.928921 13.3982 1.40641 14.724 2.39847C13.3956 3.76461 12.5982 5.56931 12.478 7.48189L3.76818 7.48189C3.88841 5.81766 4.59694 4.25288 5.76411 3.07394ZM5.76411 12.9251C4.59644 11.7456 3.88787 10.1799 3.76818 8.51482L12.478 8.51482C12.5982 10.4274 13.3956 12.2321 14.724 13.5982C13.3985 14.5906 11.7649 15.0685 10.1205 14.9449C8.47612 14.8214 6.93022 14.1046 5.76411 12.9251Z"
                fill="#453953"
              />
            </g>
            <defs>
              <clipPath id="clip0_50_9078">
                <rect
                  width="16"
                  height="31"
                  fill="white"
                  transform="translate(31) rotate(90)"
                />
              </clipPath>
            </defs>
          </svg>
        </Anc>
        <Contain>
          <StakedCon>
            {/* <Text size="h3" as="h2" color="#170728">
              A0B1C012
            </Text> */}

            <SItem>
              <Text>Staking Period</Text>
              <Text>{getDateFromSeconds(data.finishAt.toString())}</Text>
            </SItem>

            <SItem>
              <Text>Total Staking Pool</Text>
              <Text>
                {fromBigNumber(
                  data.totalForStake,
                  stakingToken[chainId].decimal
                ).toLocaleString()}
                &nbsp;
                {stakingToken[chainId].symbol}
              </Text>
            </SItem>

            <SItem>
              <Text>Current Revenue Share</Text>
              <Text>
                {fromBigNumber(
                  data.totalReward,
                  rewardToken[chainId].decimal
                ).toLocaleString()}
                &nbsp;
                {rewardToken[chainId].symbol}
              </Text>
            </SItem>

            <SItem>
              <Text>Reward Token</Text>
              <Text>{stake?.reward_token}</Text>
            </SItem>

            <SItem>
              <Text>Status</Text>
              <Text>
                {getStatus(data.finishAt)
                  ? " in progress"
                  : " Staking period is over"}
              </Text>
            </SItem>

            <SDetials>
              <Text weight="700" color="#fff">
                Stake Details
              </Text>
              <SItem className="sd">
                <Text>Coin</Text>
                <Text weight="700">VetMe</Text>
              </SItem>
              <SItem className="sd">
                <Text>Total Amount Staked</Text>
                <div>
                  <Text weight="700">
                    {stake?.amount.toLocaleString()}
                    &nbsp;
                    {stakingToken[chainId].symbol}
                  </Text>
                  ~$
                  {computeUsdPrice(data.usd, stake?.amount).toLocaleString()}
                </div>
              </SItem>
              <SItem className="sd">
                <Text>User contribution (%)</Text>
                <Text weight="700">
                  {getStakePercent(
                    fromBigNumber(stake?.amount, stakingToken[chainId].decimal),
                    fromBigNumber(
                      data.totalSupply,
                      stakingToken[chainId].decimal
                    )
                  )}
                  %
                </Text>
              </SItem>
              <SItem className="sd">
                <Text>Redemption Period</Text>
                <Text weight="700">
                  {getDateFromSeconds(data.finishAt.toString())}
                </Text>
              </SItem>
            </SDetials>

            <Issue>
              <Text>Having issues? Get Help</Text>
              <ArrowRight />
            </Issue>
            <Spacer height={26} />

            <Flex gap={20}>
              {isPending(data.w_pending) ? (
                <div>
                  {getRemaining(data.w_pending) > 0 && (
                    <Text>{getRemaining(data.w_pending)} day(s) remaining</Text>
                  )}
                  <Spacer />
                  <Flex gap={20}>
                    <ActionBtn disabled={loading} onClick={cancelRequest}>
                      Cancel Pending Request
                    </ActionBtn>
                    {canWithdraw(data.w_pending) && (
                      <ActionBtn disabled={loading} onClick={withdraw}>
                        Withdraw
                      </ActionBtn>
                    )}
                  </Flex>
                </div>
              ) : (
                <ActionBtn disabled={loading} onClick={requestWithdraw}>
                  Send Withdraw Request
                </ActionBtn>
              )}
            </Flex>
            <br />
            {getStatus(data.finishAt) ? <></> : <>Reward sharing period</>}
          </StakedCon>
        </Contain>
        <Spacer height={35} />
      </SInner>
    </Modal>
  );
};
