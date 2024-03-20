import { Flex, Spacer, Text } from "@/components";
import { Button } from "@/components/Button";
import {
  EarningIcon,
  PoolIcon,
  PoorShape,
  StakingShape,
} from "@/components/Icons";
import Connect from "@/components/Modal/Connect";
// import { RewardModal } from "@/components/Modal";
import Message from "@/components/Modal/Message";
import { MainRewardModal } from "@/components/Modal/Reward";
import { MainStakingModal } from "@/components/Modal/Stake";
import { MainStakedModal } from "@/components/Modal/Staked";
import StackingAds from "@/components/StackingAds";
import { computeUsdPrice, fromBigNumber, getStatus, truncate } from "@/helpers";
import {
  useContractFetch,
  useRContractFetch,
} from "@/hooks/useContractFetchV2";
import { stakingToken } from "@/lib/constants";
import { getStake } from "@/services/api";
import { useWeb3Modal } from "@web3modal/react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useAccount, useChainId } from "wagmi";

const StakeCon = styled.div`
  width: 237.813px;
  height: 101.653px;
  position: relative;
  padding: 10px;

  color: #fff;

  &.light {
    color: #170728;
  }

  .inner {
    position: relative;
    z-index: 10;
  }

  > svg {
    position: absolute;
    inset: 0;
  }
`;

const Header = styled.div`
  position: absolute;
  top: 0%;
  left: 43%;
  transform: translateX(-50%);
  white-space: nowrap;
  color: #170728;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% + 20px);
  svg {
    flex-shrink: 0;
  }

  > div {
    width: 100%;
    padding: 0px 15px;
  }

  h2 {
    font-size: 20px;
    color: #fff;

    &.light {
      color: #170728;
    }
  }
`;

const IMessage = styled.div`
  background: #fff9e7;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  width: fit-content;

  &.danger {
    background: #ffe7e7;
  }

  &.success {
    background: #e7fff2;
  }
`;

const UsdVal = styled.span`
  overflow-wrap: anywhere;
  font-size: 12px;
  color: #acacac;
  bottom: -23px;
`;

// const Count = styled.div``;

// const Count = styled.div`
//   font-size: 82px;
//   color: #170728;

//   height: 100svh;
//   background: #80ad8b3b;
//   inset: 0;
//   width: 100%;
//   position: fixed;
//   z-index: 9999999;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   backdrop-filter: blur(5px);

//   h4 {
//     margin-bottom: 20px;
//     font-weight: 700;
//   }

//   @media (max-width: 640px) {
//     font-size: 48px;
//     > div {
//       margin-top: -50px;
//     }
//   }
// `;

// import stakingAbi from "@/abi/staking.json";
// import { contracts } from "@/lib/constants";

enum ModelPop {
  Stake = "stake",
  Staked = "staked",
  Reward = "reward",
}

interface IStake {
  account: string;
  amount: number;
}

const Home = () => {
  const [show, setShow] = useState<ModelPop | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const [showConnect, setShowConnect] = useState<boolean>(false);
  const [staked, toggleStaked] = useState<boolean>(false);
  const [stake, setStake] = useState<IStake>({
    amount: 0,
    account: "",
  });
  const [fetching, setFetching] = useState<boolean>(false);
  const { isConnected, address } = useAccount();
  const { open: openModal } = useWeb3Modal();
  const chainId: number = useChainId();

  const { loading, data } = useContractFetch({ chainId, staked });
  const { data: rdata } = useRContractFetch({ chainId });

  useEffect(() => {
    const fetchStake = async () => {
      try {
        setFetching(true);
        const data: any = await getStake(address);
        setStake(data.stake);
        setFetching(false);
      } catch (err) {
        setFetching(false);
      }
    };

    fetchStake();
  }, [address, staked]);

  return (
    <div>
      <div className="h-screen ">
        <div className="container">
          <StackingAds />
        </div>
        <Spacer height={50} />
        <div className="container">
          {/* <Count>
            <IMessage >
              <Text as="h4" size="normal">
                Reward starts in...
              </Text>
              <Countdown
                date={Date.parse(
                  "Monday, October 16, 2023 00:00:00 PM GMT+01:00"
                )}
              />
            </IMessage>
          </Count> */}
          <Spacer height={50} />
          {isConnected ? (
            <div>
              {loading ? (
                <>Loading.. </>
              ) : (
                <div>
                  <Flex gap={20} wrap>
                    <StakeCon>
                      <Header>Staking Balance</Header>
                      <StakingShape />
                      <Inner className="inner">
                        <Flex align="center" justify="space-between">
                          <EarningIcon />
                          <div>
                            <h2>
                              {stake?.amount == 0 ? "0" : stake?.amount || "--"}
                              &nbsp;
                              {stakingToken[chainId].symbol}
                            </h2>
                            <UsdVal>
                              ~$
                              {stake?.amount &&
                                computeUsdPrice(
                                  data.usd,
                                  fromBigNumber(
                                    stake?.amount as any,
                                    stakingToken[chainId].decimal
                                  )
                                ).toLocaleString()}
                            </UsdVal>
                          </div>
                        </Flex>
                      </Inner>
                    </StakeCon>

                    <StakeCon className="light">
                      <Header>Staking Pool</Header>
                      <PoorShape />
                      <Inner className="inner">
                        <Flex align="center" justify="space-between">
                          <PoolIcon />
                          <h2 className="light">
                            {truncate(
                              fromBigNumber(
                                data.totalForStake,
                                stakingToken[chainId].decimal
                              ).toLocaleString(),
                              9
                            )}
                            &nbsp;
                            {stakingToken[chainId].symbol}
                          </h2>
                        </Flex>
                      </Inner>
                    </StakeCon>

                    <StakeCon className="light">
                      <Header>Total Staked</Header>
                      <PoorShape />
                      <Inner className="inner">
                        <Flex align="center" justify="space-between">
                          <PoolIcon />
                          <div>
                            <h2 className="light">
                              {truncate(
                                fromBigNumber(
                                  data.totalSupply,
                                  stakingToken[chainId].decimal
                                ).toLocaleString(),
                                9
                              )}
                              &nbsp;
                              {stakingToken[chainId].symbol}
                            </h2>

                            <UsdVal>
                              ~$
                              {computeUsdPrice(
                                data.usd,
                                fromBigNumber(
                                  data.totalSupply,
                                  stakingToken[chainId].decimal
                                )
                              ).toLocaleString()}
                            </UsdVal>
                          </div>
                        </Flex>
                      </Inner>
                    </StakeCon>
                  </Flex>

                  <Spacer height={24} />
                  <Flex gap={20} wrap>
                    {stake?.amount > 0 && (
                      <Button
                        className="secondary "
                        onClick={() => setShow(ModelPop.Staked)}
                      >
                        View Stake Details
                      </Button>
                    )}

                    <Button
                      className="primary "
                      onClick={() => setShow(ModelPop.Stake)}
                    >
                      Stake
                    </Button>
                    {/* 
                    {getStatus(data.finishAt) && (
                      <Button
                        className="primary "
                        onClick={() => setShow(ModelPop.Stake)}
                      >
                        Stake
                      </Button>
                    )} */}

                    {/* <Button
                      className="secondary"
                      onClick={() => setShow(ModelPop.Reward)}
                    >
                      Get Reward
                    </Button> */}
                    {/* {fromBigNumber(
                      data.balanceOf,
                      stakingToken[chainId].decimal
                    ) > 0 && (
                      <Button
                        className="secondary"
                        onClick={() => setShow(ModelPop.Reward)}
                      >
                        Get Reward
                      </Button>
                    )} */}
                  </Flex>

                  <Spacer />

                  <IMessage className="success">
                    {!getStatus(data.finishAt) && (
                      <Text size="normal">
                        Staking rewards will be shared on the 20th of March.
                      </Text>
                    )}
                  </IMessage>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button className="primary" onClick={() => setShowConnect(true)}>
                Connect Wallet
              </Button>
            </>
          )}
        </div>
      </div>
      <MainStakingModal
        show={show == ModelPop.Stake ? true : false}
        handleClose={() => setShow(undefined)}
        revalidate={() => toggleStaked((prev) => !prev)}
        data={data}
      />
      <MainStakedModal
        show={show == ModelPop.Staked ? true : false}
        handleClose={() => setShow(undefined)}
        data={data}
        stake={stake}
        revalidate={() => toggleStaked((prev) => !prev)}
      />
      <MainRewardModal
        show={show == ModelPop.Reward ? true : false}
        handleClose={() => setShow(undefined)}
        data={data}
        rdata={rdata}
        revalidate={() => toggleStaked((prev) => !prev)}
      />
      {/* <button onClick={() => setOpen(true)}>Open</button> */}
      <Message
        show={open}
        handleClose={() => setOpen(false)}
        msg="Transaction Successful"
        headerText="Success"
      />

      <Connect show={showConnect} handleClose={() => setShowConnect(false)} />
    </div>
  );
};

export default Home;
