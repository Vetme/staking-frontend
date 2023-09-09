import { Flex, Spacer, Text } from "@/components";
import { Button } from "@/components/Button";
import {
  EarningIcon,
  PoolIcon,
  PoorShape,
  StakingShape,
} from "@/components/Icons";
import { StakedModal, StakingModal } from "@/components/Modal";
import Message from "@/components/Modal/Message";
import StackingAds from "@/components/StackingAds";
import { fromBigNumber, getStatus } from "@/helpers";
import { useContractFetch } from "@/hooks/useContractFetch";
import { stakingToken } from "@/lib/constants";
import { useWeb3Modal } from "@web3modal/react";
// import { useMulticallv2 } from "@/helpers/multicall";
import { useState } from "react";
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

// import stakingAbi from "@/abi/staking.json";
// import { contracts } from "@/lib/constants";

enum ModelPop {
  Stake = "stake",
  Staked = "staked",
}

const Home = () => {
  const [show, setShow] = useState<ModelPop | undefined>(undefined);
  const [open, setOpen] = useState<boolean>(false);
  const { isConnected } = useAccount();
  const { open: openModal } = useWeb3Modal();
  const chainId: number = useChainId();

  const { loading, data } = useContractFetch({ chainId });

  return (
    <div>
      <div className="h-screen ">
        <div className="container">
          <StackingAds />
        </div>
        <Spacer height={50} />
        <div className="container">
          {/* <ActionBtn onClick={() => setShow(ModelPop.Stake)}>
            Open Stake
          </ActionBtn>

          <ActionBtn onClick={() => setShow(ModelPop.Staked)}>
            Open Staked
          </ActionBtn> */}

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
                          <h2>
                            {fromBigNumber(data.balanceOf, 18).toLocaleString()}
                            &nbsp;
                            {stakingToken[chainId].symbol}
                          </h2>
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
                            {fromBigNumber(
                              data.totalForStake,
                              18
                            ).toLocaleString()}
                            &nbsp;
                            {stakingToken[chainId].symbol}
                          </h2>
                        </Flex>
                      </Inner>
                    </StakeCon>
                  </Flex>

                  <Spacer height={24} />
                  {fromBigNumber(data.balanceOf, 18) > 0 && (
                    <Button
                      className="secondary "
                      onClick={() => setShow(ModelPop.Staked)}
                    >
                      View Stake Details
                    </Button>
                  )}

                  <Spacer height={24} />
                  {getStatus(data.finishAt) ? (
                    <Button
                      className="primary "
                      onClick={() => setShow(ModelPop.Staked)}
                    >
                      Stake
                    </Button>
                  ) : (
                    <Text size="h4">
                      Staking Period is over. kindly wait for our next round
                    </Text>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <Button className="primary" onClick={() => openModal()}>
                Connect Wallet
              </Button>
            </>
          )}
        </div>
      </div>

      <StakingModal
        show={show == ModelPop.Stake ? true : false}
        handleClose={() => setShow(undefined)}
      />

      <StakedModal
        show={show == ModelPop.Staked ? true : false}
        handleClose={() => setShow(undefined)}
        data={data}
      />

      {/* <button onClick={() => setOpen(true)}>Open</button> */}

      <Message
        show={open}
        handleClose={() => setOpen(false)}
        msg="Transaction Successful"
        headerText="Success"
      />
    </div>
  );
};

export default Home;
