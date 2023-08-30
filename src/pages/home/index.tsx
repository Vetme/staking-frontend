import { ActionBtn, Spacer } from "@/components";
import { StakedModal, StakingModal } from "@/components/Modal";
import StackingAds from "@/components/StackingAds";
import { useState } from "react";

enum ModelPop {
  Stake = "stake",
  Staked = "staked",
}

const Home = () => {
  const [show, setShow] = useState<ModelPop | undefined>(undefined);

  return (
    <div>
      <div className="h-screen ">
        <div className="container">
          <StackingAds />
        </div>

        <Spacer />

        <div onClick={() => setShow(ModelPop.Stake)} className="container">
          <ActionBtn>Open Stake</ActionBtn>
        </div>

        <div onClick={() => setShow(ModelPop.Staked)} className="container">
          <ActionBtn>Open Staked</ActionBtn>
        </div>
      </div>

      <StakingModal
        show={show == ModelPop.Stake ? true : false}
        handleClose={() => setShow(undefined)}
      />

      <StakedModal
        show={show == ModelPop.Staked ? true : false}
        handleClose={() => setShow(undefined)}
      />
    </div>
  );
};

export default Home;
