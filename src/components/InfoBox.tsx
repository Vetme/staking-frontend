import styled from "styled-components";
import React from "react";
import { Flex, Spacer, Text } from ".";
import { InfoIcon } from "./Icons";

interface IInfo {
  text: string;
  direction: "column" | "row";
}

const Container = styled.div`
  padding: 42px 24px 24px 42px;
  background-image: url(/images/bg/info.svg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top center;
  min-height: 236px;

  @media (max-width: 640px) {
    padding: 10px;
    background-image: none;
    min-height: auto;
  }
`;

const InfoBox = ({ text, direction }: IInfo) => {
  return (
    <>
      {direction == "column" && <BuildColumn text={text} />}
      {direction == "row" && <BuildRow text={text} />}
    </>
  );
};

const BuildColumn = ({ text }: { text: string }) => (
  <Container>
    <InfoIcon />
    <Spacer height={14} />
    <Text size="s2">{text}</Text>
  </Container>
);
const BuildRow = ({ text }: { text: string }) => (
  <Flex gap={14}>
    <div style={{ flexShrink: 0 }}>
      <InfoIcon />
    </div>
    <Spacer height={14} />
    <Text size="s2">{text}</Text>
  </Flex>
);

export default InfoBox;
