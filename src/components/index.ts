import styled from "styled-components";
export { default as Footer } from "./Footer";

export const Text = styled.span<{
  weight?: string;
  size?:
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "big"
  | "normal"
  | "small"
  | "tiny"
  | "s1"
  | "s2"
  | "s3"
  | "s4";
  color?: string;
  sizeM?: string;
  padding?: string;
  uppercase?: boolean;
}>`
  display: block;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  font-size: ${({ size }) =>
    size == "h1"
      ? "56px"
      : size == "h2"
        ? "40px"
        : size == "h3"
          ? "26px"
          : size == "h4"
            ? "18px"
            : size == "h5"
              ? "14px"
              : size == "big"
                ? "20px"
                : size == "normal"
                  ? "18px"
                  : size == "small"
                    ? "16px"
                    : size == "tiny"
                      ? "14px"
                      : size == "s1"
                        ? "18px"
                        : size == "s2"
                          ? "16px"
                          : size == "s3"
                            ? "14px"
                            : size == "s4"
                              ? "14px"
                              : "18px"};
  line-height: 150%;
  color: ${({ color }) => color};

  letter-spacing: 0.02em;
  text-transform: ${({ uppercase }) => uppercase && "Uppercase"};

  &.fancy {
    background: linear-gradient(302.59deg, #a93ceb -21.04%, #6a64ff 124.16%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @media (max-width: 640px) {
    font-size: ${({ sizeM }) =>
    sizeM == "h1"
      ? "56px"
      : sizeM == "h2"
        ? "40px"
        : sizeM == "h3"
          ? "26px"
          : sizeM == "h4"
            ? "18px"
            : sizeM == "h5"
              ? "14px"
              : sizeM == "big"
                ? "20px"
                : sizeM == "normal"
                  ? "18px"
                  : sizeM == "small"
                    ? "16px"
                    : sizeM == "tiny"
                      ? "14px"
                      : sizeM == "tiny-2"
                        ? "10px"
                        : sizeM == "s1"
                          ? "18px"
                          : sizeM == "s2"
                            ? "16px"
                            : sizeM == "s3"
                              ? "14px"
                              : sizeM == "s4"
                                ? "14px"
                                : "14px"};
  }
`;

export const Flex = styled.div<{
  direction?: "row" | "column";
  align?: string;
  gap?: number;
  justify?:
  | "space-between"
  | "space-evenly"
  | "space-around"
  | "center"
  | "flex-end";
  directionM?: string;
  margin?: string;
  wrap?: boolean;
  expand?: boolean;
}>`
  display: flex;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  align-items: ${({ align }) => (align ? align : "flex-start")};
  justify-content: ${({ justify }) => (justify ? justify : "flex-start")};
  margin: ${({ margin }) => (margin ? margin : "0")};
  flex-wrap: ${({ wrap }) => wrap && "wrap"};
  width: ${({ expand }) => expand && "100%"};
  gap: ${({ gap }) => gap + "px"};

  &.home-p {
    @media (max-width: 640px) {
      padding: 10px 0px;
      margin: 0px 24px;
    }
  }
  @media (max-width: 640px) {
    flex-direction: ${({ directionM }) => directionM && directionM};

    &.grid {
      justify-content: center;
    }
  }
`;

export const Spacer = styled.div<{
  height?: number;
  width?: number;
  heightM?: number;
  widthM?: number;
}>`
  height: 10px;
  height: ${({ height }) => height && height + "px"};
  width: 0px;
  width: ${({ width }) => width && width + "px"};
  flex-shrink: 0;

  @media (max-width: 640px) {
    height: ${({ heightM }) => heightM && heightM + "px"};
    width: ${({ widthM }) => widthM && widthM + "px"};
  }
`;

export const InputCon = styled.div`
  label {
    font-weight: 400;
    font-size: 14px;
    line-height: 21px;
    color: #453953;
    text-transform: uppercase;
  }
`;
export const InputBox = styled.div<{ required?: boolean }>`
  display: flex;
  background-image: url(/images/bg/input.svg);
  background-repeat: no-repeat;
  background-position: top center;
  background-size: 100% 100%;
  height: 75px;
  align-items: center;
  position: relative;

  span.error {
    position: absolute;
    bottom: -20px;
    left: 25px;
    font-size: 12px;
    color: #f44336;
  }

  label {
    position: absolute;
    top: 0px;
    text-transform: uppercase;
    left: 38px;

    ${({ required }) =>
    required &&
    `
      &:after {
      content: "*";
      position: absolute;
      top: 0px;
      font-size: 12px;
      right: -10px;
      color: #f44336;
    }
    `}

    @media (max-width: 640px) {
      left: 28px;
      font-size: 12px;
    }
  }

  @media (max-width: 640px) {
    /* height: 73px; */
    span.error {
      left: 20px;
    }
  }

  &.standard {
    /* width: 383px; */
    @media (max-width: 640px) {
      width: 100%;
    }

    div {
      width: 100% !important;
    }
  }
`;
export const Input = styled.input`
  height: 50px;
  position: relative;
  border: none;
  outline: none;
  flex: 1;
  font-weight: 700;
  font-weight: 400;
  font-size: 18px;
  /* width: 30%; */
  background:transparent;
  color: #170728;
  margin-left: 38px;

  &.disabled {
    pointer-events: none;
  }

  @media (max-width: 640px) {
    /* font-size: 30px; */
    font-size: 16px;
    margin-left: 28px;
  }
`;

export const InputInner = styled.div`
  display: flex;
  top: 11.5px;
  align-items: center;
  position: relative;
  padding-right: 10px;

  justify-content: space-between;
  width: 100%;
  

  select {
    left: 32px;
    position: absolute;
    width: calc(100% - 40px);
  }
`;

export const BodyWrapper = styled.main`
  /* background: #fafafa; */
  padding: 35px 0px;
  flex: 1;
  margin-top: 80px;
`;
export const OnlyMobile = styled.div`
  display: none;
  @media (max-width: 640px) {
    display: block;
  }
`;

export const Overlay = styled.div`
  background: rgba(242, 255, 245, 0.7);
  backdrop-filter: blur(5px);
  inset: 0;
  height: 100vh;
  width: 100vw;
  z-index: 996;
  position: fixed;
`;

export const Center = styled.div`
     display:flex;
     align-items:center;
     justify-content:center;
     text-align;
     margin:auto;
  `;

export const CustomLink = styled.a`
  position: relative;
  margin: 0px 16px;
  transition: 0.3s;

  span:nth-child(1),
  span:nth-child(3) {
    position: absolute;
    transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  span:nth-child(1) {
    left: -8px;
  }

  span:nth-child(3) {
    right: -8px;
  }

  button {
    text-transform: uppercase;
  }

  &:hover {
    span:nth-child(1) {
      left: -14px;
    }
    span:nth-child(3) {
      right: -14px;
    }
  }
`;

export const ActionBtn = styled.button`
  all: unset;
  background: #ABE5B9;
  height: 71px;
    display: block;
    line-height: 71px;

  border: 1px solid #2e203e;
  border-radius: 12px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 18px;
  position: relative;
  color: #170728;
  cursor: pointer;
  text-align: center;
  z-index: 50;
  transition: 0.3s ease-in-out;
  padding:0px 20px; 

  &:hover,
  :active {
    background: #BEFECD;
  }
  div {
    position: absolute;
    right: 14px;
    top: 14px;

    height: 55px;
    line-height: 55px;
    width: 55px;
    border-radius: 100px;
    background: #170728;
  }

  &:after {
    content: "";
    position: absolute;
    border: 1px solid #2e203e;
    height: 100%;
    width: 100%;
    bottom: -6px;
    left: -6px;
    border-radius: 12px;
    z-index: -1;
    border-top: none;
    border-right: none;
  }

  &.sm {
    height: 54px;
    line-height: 54px;
  }

  &.full {
    width: -webkit-fill-available;
    display: block;
  }


  &.secondary {
    background: #fbf2ff;
    border: 1px solid #2e203e;
    &:hover,
    :active {
      background: #f7f0fb;
    }
  }
  &.icon {
    svg {
      margin-top: 14px;
    }
  }
`;