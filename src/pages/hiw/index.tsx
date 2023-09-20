import React from "react";

const steps = [
  "Acquire VetMe Tokens: If you don't already own VetMe tokens, you can purchase them on Uniswap.",
  "Visit the VetMe Staking Platform: Navigate to the VetMe staking platform at staking.vetmeblock.com.",
  "Select 'Stake': On the platform's front page, locate and click on the 'Stake' option.",
  "Choose the Amount to Stake: Select the amount of VetMe tokens you wish to stake.",
  "Approve the Staking Transaction: Click the 'APPROVE' button to initiate the staking process.",
  "Confirm the Transaction: Follow the on-screen prompts to confirm your staking transaction.",
  "Check Staking Details",
];

const Hiw = () => {
  return (
    <div className="container">
      <div className="faq-con">
        <div className="header">
          <h4>How to Stake Your VetMe Tokens</h4>
          <p style={{ margin: "10px 0px" }}>
            Staking your VetMe tokens is a straightforward process that allows
            you to earn rewards. If you don't have VetMe tokens yet, you can
            acquire them on Uniswap.
          </p>
          <p style={{ margin: "10px 0px" }}>
            Follow these steps to stake your VetMe tokens:
          </p>
        </div>
        <div>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>
                <b>Step {index + 1}:</b>
                <br />
                {step}
              </li>
            ))}
          </ol>
          <div>
            <p>
              You can view the details of your staking activity on the
              platform's homepage. That's it! Good luck with your staking
              journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hiw;
