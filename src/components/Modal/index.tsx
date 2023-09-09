import styled from "styled-components";
import { ActionBtn, Flex, Input, InputBox, InputInner, Spacer, Text } from "..";
import { ReactNode, useState, useEffect } from "react";
import InfoBox from "../InfoBox";
import { ArrowRight, Dot, LineDivide } from "../Icons";
import { motion, AnimatePresence } from "framer-motion";
import { getERC20Contract, getStakingContract } from "@/helpers/contract";
import { contracts, stakingToken } from "@/lib/constants";
import { useAccount, useChainId } from "wagmi";
import { useEthersProvider } from "@/hooks/useProvider";
import { useEthersSigner } from "@/hooks/useSigner";
import { parseUnits } from "ethers";
import { fromBigNumber, getIMonth, getStatus, revertMatch } from "@/helpers";
import { toast } from "react-toastify";

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
const Inner = styled.div`
  width: 1088px;
  max-width: 95%;
  padding: 82px 41px 50px 41px;
  height: 1083.448px;

  /* margin: auto; */
  background-image: url(/images/bg/staking.svg);
  background-repeat: no-repeat;
  background-position: top center;
  /* background-size: 100% 100%; */
  background-size: 100%;
  margin: auto;

  /* left: 50%; */
  top: 0%;
  position: relative;
  /* transform: translateX(-50%); */

  @media (max-width: 640px) {
    background: #fff;
    background-image: none;
    padding: 50px 10px 20px 10px;
    height: auto;
    /* background-image: url(/images/bg/message-m.png); */
  }
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
    padding: 50px 21px 50px 21px;
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

const FormCon = styled.div`
  flex: 1;
  border: 1px solid #453953;
  padding: 20px;
  border-radius: 5px;
  height: calc(100% - 82px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 640px) {
    border: 1px solid transparent;
  }
`;

const Summary = styled.div`
  flex: 1;
  height: calc(100% - 82px);

  h2 {
    font-size: 35px !important;
  }
`;

const StakeCon = styled.div`
  display: flex;
  gap: 49px;
  height: 100%;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StakedCon = styled.div`
  height: 100%;
`;

const Wrapper = styled.div``;
// const StakingInfo = styled.div`
//   border-radius: 3px;
//   background: #eff1ea;
//   padding: 23px 27px;
//   width: 100%;
// `;
const StateInfo = styled.div`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #000;
  background: #fff;

  .dot {
    width: 14.857px;
    height: 14.857px;
    fill: #170728;
  }
`;

const Divide = styled.div`
  margin: 10px 15px;
  position: relative;
`;

// const Apr = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border-radius: 10px;
//   background: #170728;
//   height: 55px;
//   padding: 0px 18px;
//   color: #fff;
// `;

const SummaryCon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 82px);

  input[type="checkbox"] {
    scale: 1.4;
    accent-color: #170728;
    margin-right: 25px;
  }
`;

const SItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  height: 33px;
  margin: 12px 0px;

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

export const StakingModal = ({
  handleClose,
  show,
}: {
  handleClose: () => void;
  show: boolean;
}) => {
  const [allowance, setAllowance] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  // const [staking, setStaking] = useState<boolean>(false);
  const [approving, setApproving] = useState<boolean>(false);
  const chainId: number = useChainId();
  const { address } = useAccount();

  const provider = useEthersProvider();
  const signer = useEthersSigner();

  const getAllowance = async () => {
    const contract: any = getERC20Contract(
      contracts.token[chainId],
      chainId as any,
      provider
    );

    if (!address) return;
    const allowance = await contract.allowance(
      address,
      contracts.staking[chainId]
    );

    const value = fromBigNumber(
      allowance.toString(),
      stakingToken[chainId].decimal
    );
    setAllowance(value);
  };

  const approve = async () => {
    setApproving(true);
    const contract: any = getERC20Contract(
      contracts.token[chainId],
      chainId as any,
      signer
    );

    try {
      const value = parseUnits(
        amount.toString(),
        stakingToken[chainId].decimal
      );

      const tx = await contract.approve(contracts.staking[chainId], value);

      setApproving(false);
      const receipt = await tx.wait();
      console.log(receipt);
      getAllowance();
    } catch (err: any) {
      const match = revertMatch(err);
      if (match) {
        toast.error(match[0] || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(err.message || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setApproving(false);
    }
  };

  const stake = async () => {
    setLoading(true);
    const contract: any = getStakingContract(chainId as any, signer);

    try {
      const value = parseUnits(
        amount.toString(),
        stakingToken[chainId].decimal
      );

      const tx = await contract.stake(value);
      setLoading(false);
      const receipt = await tx.wait();
      console.log(receipt);
      getAllowance();
      toast.success("Stake successful, Check back to claim your reward later", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err: any) {
      const match = revertMatch(err);
      if (match) {
        toast.error(match[0] || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(err.message || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

  const handleStake = async () => {
    if (amount == 0) return;
    if (allowance >= amount) {
      await stake();
    } else {
      alert();
      await approve();
    }
  };

  useEffect(() => {
    getAllowance();
  }, []);

  return (
    <Modal {...{ handleClose, show }}>
      <Inner
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
          <StakeCon>
            <FormCon>
              <Wrapper>
                <InfoBox
                  text="Lorem ipsum dolor sit amet consectetur. Est sit in egestas dolor non. Sed enim turpis nulla quisque. Semper vulputate sagittis diam imperdiet ti"
                  direction="column"
                />

                <Spacer height={30} />

                <InputBox className="standard">
                  <label htmlFor="">Lock Amount</label>
                  <InputInner>
                    <Input
                      onChange={(e: any) => setAmount(e.target.value)}
                      name="telegram"
                      value={amount || ""}
                      type="text"
                      step={0.1}
                      placeholder="ENTER AMOUNT"
                    />
                    <Flex className="max" justify="flex-end" gap={10}>
                      <Text size="s2">XPT</Text>|
                      <Text
                        role="button"
                        style={{ cursor: "pointer" }}
                        weight="700"
                        color="#0A7C30"
                        size="s2"
                      >
                        MAX
                      </Text>
                    </Flex>
                  </InputInner>
                </InputBox>
              </Wrapper>

              {/* <Wrapper>
                <StakingInfo>
                  <Text size="s2" weight="600">
                    Locked Amount Limitation
                  </Text>
                  <Text size="s2">Minimum : 0.01 XRP</Text>
                  <Text size="s2">Available Quota : 50 XRP</Text>
                  <Text size="s2">Available Personal Quota : 50 XRP</Text>
                </StakingInfo>
              </Wrapper> */}
            </FormCon>
            <Summary>
              <Text as="h2" color="#170728" size="h2">
                Summary
              </Text>
              <Spacer height={20} />
              <SummaryCon>
                <Wrapper>
                  <StateInfo>
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        <div className="dot">
                          <Dot />
                        </div>
                        <Spacer width={10} />
                        <Text size="s2">Stake Date</Text>
                      </Flex>
                      <Text size="s2">2023-01-18 18:25</Text>
                    </Flex>
                  </StateInfo>
                  <Divide>
                    <LineDivide />
                  </Divide>

                  <StateInfo>
                    <Flex justify="space-between" align="center">
                      <Flex align="center">
                        <div className="dot">
                          <Dot />
                        </div>
                        <Spacer width={10} />
                        <Text size="s2">Interest Distribution Date</Text>
                      </Flex>
                      <Text size="s2">2023-01-19 18:25</Text>
                    </Flex>
                  </StateInfo>
                  <Spacer height={30} />
                  {/* <Apr>
                    <Text size="s2">Est. APR</Text>
                    <Text size="s2">30%</Text>
                  </Apr> */}
                </Wrapper>
                <Wrapper>
                  <InfoBox
                    text="Lorem ipsum dolor sit amet consectetur. Est sit in egestas dolor non. Sed enim turpis nulla quisque. Semper vulputate sagittis diam imperdiet tincidunt cras."
                    direction="row"
                  />
                  <Spacer height={37} />
                  <Flex gap={14}>
                    <input type="checkbox" />
                    <Text size="s2">
                      I have read and agreed to Vetme Simple Earn and Service
                      Agreement.
                    </Text>
                  </Flex>
                  <Spacer height={15} />

                  <div>
                    {loading && "loading..."}
                    <ActionBtn
                      disabled={loading || approving || amount == 0}
                      className="full"
                      onClick={() => handleStake()}
                    >
                      {allowance >= amount ? "Confirm" : "Approve"}
                    </ActionBtn>
                  </div>
                </Wrapper>
              </SummaryCon>
            </Summary>
          </StakeCon>
        </Contain>
        <Spacer height={35} />
      </Inner>
    </Modal>
  );
};

export const StakedModal = ({
  handleClose,
  show,
  data,
}: {
  handleClose: () => void;
  show: boolean;
  data: any;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const chainId: number = useChainId();
  // const { address } = useAccount();

  // const provider = useEthersProvider();
  const signer = useEthersSigner();

  // const unstake = async () => {
  //   setLoading(true);
  //   const contract: any = getStakingContract(chainId as any, signer);
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
    const contract: any = getStakingContract(chainId as any, signer);
    try {
      const tx = await contract.requestWithdraw();
      setLoading(false);
      const receipt = await tx.wait();
      console.log(receipt);
      //  renderSuccess("Approved");
    } catch (err: any) {
      const match = revertMatch(err);
      if (match) {
        toast.error(match[0] || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
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
    const contract: any = getStakingContract(chainId as any, signer);
    try {
      const tx = await contract.withdraw();
      setLoading(false);
      const receipt = await tx.wait();
      console.log(receipt);
      //  renderSuccess("Approved");
    } catch (err: any) {
      const match = revertMatch(err);
      if (match) {
        toast.error(match[0] || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(err.message || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

  const claimReward = async () => {
    setLoading(true);
    const contract: any = getStakingContract(chainId as any, signer);
    try {
      const tx = await contract.claimReward();
      setLoading(false);
      const receipt = await tx.wait();
      console.log(receipt);
      //  renderSuccess("Approved");
    } catch (err: any) {
      const match = revertMatch(err);
      if (match) {
        toast.error(match[0] || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error(err.message || "Opps, something went wrong!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      setLoading(false);
    }
  };

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
            <Text size="h3" as="h2" color="#170728">
              A0B1C012
            </Text>

            <SItem>
              <Text>Interest Period</Text>
              <Text>{getIMonth(data.duration.toString())}</Text>
            </SItem>

            <SItem>
              <Text>Status</Text>
              <Text>
                {getStatus(data.finishAt)
                  ? " in progress"
                  : " Staking period is over"}
              </Text>
            </SItem>

            {/* <SItem>
              <Text>Stake Date</Text>
              <Text>2023-01-19 19:25</Text>
            </SItem> */}

            <SDetials>
              <Text weight="700" color="#fff">
                Stake Details
              </Text>
              <SItem className="sd">
                <Text>Coin</Text>
                <Text weight="700">VetMe</Text>
              </SItem>
              <SItem className="sd">
                <Text>Total Amount</Text>
                <Text weight="700">
                  {fromBigNumber(data.totalForStake, 18).toLocaleString()}
                  &nbsp;
                  {stakingToken[chainId].symbol}
                </Text>
              </SItem>
              <SItem className="sd">
                <Text>Redemption Period</Text>
                <Text weight="700">{getIMonth(data.duration.toString())}</Text>
              </SItem>
            </SDetials>

            <Issue>
              <Text>Having issues? Get Help</Text>
              <ArrowRight />
            </Issue>
            <Spacer height={26} />

            {getStatus(data.finishAt) ? (
              <Flex gap={20}>
                <ActionBtn onClick={requestWithdraw}>Send Request</ActionBtn>
                <ActionBtn onClick={withdraw}>OPT OUT</ActionBtn>
              </Flex>
            ) : (
              <ActionBtn disabled={loading} onClick={claimReward}>
                Claim
              </ActionBtn>
            )}
          </StakedCon>
        </Contain>
        <Spacer height={35} />
      </SInner>
    </Modal>
  );
};
