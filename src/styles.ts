import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 :root {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;

  background-color: #fff;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

* {
  box-sizing: border-box;
}


html{
  scroll-behavior:smooth;
}


  body {
  font-family: 'Space Mono', monospace;
    background:#ffffff;
    a{
      color:#000000;
      text-decoration:none;
      &:hover{
      }
    }
  }
  h1,h2,h3,h4,h5,h6{
  font-family: 'Space Grotesk', sans-serif;

  }

  *{
    margin:0px;
    padding:0px;
    box-sizing:border-box
  }


`;

export const CTabs = styled.div`
  border-top: 1px solid #170728;
  padding: 0px 70px;
  margin-top: 30px;
  white-space: nowrap;
  /* top: 100px;
  position: sticky;
  z-index: 999;
  background: #fff; */

  @media (max-width: 960px) {
    display: none;
  }
`;

export const CItem = styled.div<{ value: string }>`
  font-size: 16px;
  font-weight: 400;
  padding: 0px 10px;
  color: #170728;
  transition: transform 0.5s ease;
  font-family: "Space Grotesk", sans-serif;
  display: inline-block;
  position: relative;
  cursor: pointer;

  &.active {
    color: transparent;
  }

  &.active::after {
    content: "${({ value }) => value}";
    position: absolute;
    height: 30px;
    width: fit-content;
    padding: 2px 10px;
    color: #170728;
    left: 0px;
    bottom: -4px;
    border: 1px solid #170728;
    border-top: 1px solid #fff;
    border-radius: 0px 0px 10px 10px;
    white-space: nowrap;
  }
`;

export const CBody = styled.div``;

export const FormCon = styled.div`
  background: url(/images/kyc.png);
  background-size: 100% 100%;
  margin: 30px 8px;
  padding: 20px 0px;
  position: relative;

  &.geo {
    background: url(/images/geo.png);
    background-size: 100% 100%;

    .header {
      left: 70px;
    }
  }

  &.cert {
    background: url(/images/cert.png);
    background-size: 100% 823px;
    border-bottom: 1px solid;
    border-radius: 0px 10px 10px 10px;
    /* background-size: 100% 100%; */
    .header {
      position: absolute;
      top: 6px;
      left: 73px;
    }
  }

  .header {
    position: absolute;
    top: 6px;
    left: 100px;
  }

  .info {
    position: absolute;
    left: 310px;
    top: 6px;
    font-size: 10px;
    color: rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 640px) {
    background: #fff;
    margin: 15px 4px;
    padding: 10px 0px;
  }
`;

export const SocialCon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(217, 217, 217, 0.3);
  border: 1px solid #453953;
  border-radius: 8px;
  padding: 16px;
  margin: 10px 0px;
  width: 100%;
`;

export const Loader = styled.div`
  position: relative;
  /* display: grid; */
  /* place-content: center; */

  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
`;
export const KYCWrapper = styled.div`
  height: 600px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;
