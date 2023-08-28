import { ActionBtn, Spacer } from "@/components";
import { StakingModal } from "@/components/Modal";
import StackingAds from "@/components/StackingAds";
import { useState } from "react";

const Home = () => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <div>
      <div className="h-screen ">
        <div className="container">
          <StackingAds />
        </div>

        <Spacer />

        <div onClick={() => setShow(true)} className="container">
          <ActionBtn>Open Stake</ActionBtn>
        </div>
      </div>

      <StakingModal show={show} handleClose={() => setShow(false)} />
    </div>
  );
};

export default Home;
