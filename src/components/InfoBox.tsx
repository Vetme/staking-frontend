import styled from "styled-components";
import React from "react";
import { Flex, Spacer, Text } from ".";
import { InfoIcon } from "./Icons";

interface IInfo {
  direction: "column" | "row";
}

const Container = styled.div`
  padding: 42px 24px 24px 42px;
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top center;
  min-height: 236px;
  border: 1px solid #fff;

  @media (max-width: 640px) {
    padding: 10px;
    /* background-image: none; */
    min-height: auto;
  }
`;

const InfoBox = ({ direction }: IInfo) => {
  return (
    <>
      {direction == "column" && <BuildColumn />}
      {direction == "row" && <BuildRow />}
    </>
  );
};

const BuildColumn = () => (
  <Container>
    <InfoIcon />
    <Spacer height={14} />
    <Text as="div" size="s2">
      Your staking rewards are sourced from the following services on our
      platform:
      <div>- Vetting Services</div>
      <div>- Escrow Services</div>
      <div>- OTC DEX (Decentralized Exchange)</div>
      <div>- KYC (Know Your Customer)</div>
      <div>- P2P Trading Platform</div>
    </Text>
  </Container>
);
const BuildRow = () => (
  <Flex gap={14}>
    <div style={{ flexShrink: 0 }}>
      <InfoIcon />
    </div>
    <Spacer height={14} />
    <Text as="div" size="s2">
      Your staking rewards are sourced from the following services on our
      platform:
      <div>- Vetting Services</div>
      <div>- Escrow Services</div>
      <div>- OTC DEX (Decentralized Exchange)</div>
      <div>- KYC (Know Your Customer)</div>
      <div>- P2P Trading Platform</div>
    </Text>
  </Flex>
);

export default InfoBox;
