import { styled } from "styled-components";
import { RIcon, VetMeIcon } from "./Icons";
import { Flex, Spacer, Text } from ".";
import { motion } from "framer-motion";

const Container = styled.div`
  height: 217px;
  border-radius: 28px;
  border: 1px solid #000;
  display: flex;
  align-items: center;
  padding: 0px 30px 0px 50px;

  @media (max-width: 640px) {
    height: 180px;
    padding: 0px 30px 0px 20px;
  }
`;
const Wrapper = styled.div`
  width: 100%;

  h2 {
    color: #170728;
    font-size: 70.359px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .word {
    display: "flex";
  }

  @media (max-width: 640px) {
    h2 {
      font-size: 24.359px;
      text-align: start;
    }

    svg {
      height: 60px;
      width: 60px;
    }

    .word {
      display: block;
    }
  }
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 640px) {
    .ricon {
      display: none;
    }
  }
`;

const StackingAds = () => {
  const words = [
    "G",
    "e",
    "n",
    "e",
    "r",
    "a",
    "t",
    "e",
    " ",
    "e",
    "a",
    "r",
    "n",
    "i",
    "n",
    "g",
    "s",
    " ",
    "f",
    "r",
    "o",
    "m",
    " ",
    "t",
    "h",
    "e",
    " ",
    "r",
    "e",
    "v",
    "e",
    "n",
    "u",
    "e",
    " ",
    "a",
    "c",
    "r",
    "o",
    "s",
    "s",
    " ",
    "a",
    "l",
    "l",
    " ",
    "V",
    "e",
    "t",
    "M",
    "e",
    " ",
    "p",
    "l",
    "a",
    "t",
    "f",
    "o",
    "r",
    "m",
    "s",
    ".",
  ];

  // Variants for Container of words.
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  // Variants for each word.

  const child = {
    visible: {
      opacity: 1,
      //   x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      //   x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <Container>
      <Inner>
        <Wrapper>
          <Flex gap={20} align="center">
            <VetMeIcon />
            <Text as="h2">VetMe revenue share</Text>
          </Flex>
          <Spacer height={13} />
          <Text
            color="#17072880"
            as={motion.div}
            style={{ overflow: "hidden" }}
            variants={container}
            initial="hidden"
            animate="visible"
            className="word"
          >
            {words.map((word, index) => (
              <motion.span
                variants={child}
                style={{ marginRight: "5px" }}
                key={index}
              >
                {word}
              </motion.span>
            ))}
          </Text>
        </Wrapper>
        <div className="ricon">
          <RIcon />
        </div>
      </Inner>
    </Container>
  );
};

export default StackingAds;
