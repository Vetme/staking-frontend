import { Flex, Text, CustomLink } from ".";
import styled from "styled-components";
import { Logo } from "./Nav/styles";
import { LogoSVG } from "./Icons";

const FooterContainer = styled.div`
  width: 100%;
`;

const FooterWrapper = styled.div`
  background: #eff1ea;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  line-height: 90px;
  padding: 26px;
  border-radius: 10px;
  margin-bottom: 16px;
  position: relative;
  background: url(/images/bg/footer.png);
  background-position: center;
`;

const CurvyBox = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="container">
        <FooterWrapper>
          <Logo to="/">
            <LogoSVG />
          </Logo>

          <Flex className="social-footer">
            <CustomLink href="https://twitter.com/VetmeToken?t=iydy_59nL4QSNB2YfQ8CIA&s=09">
              <Flex align="center">
                <span>{"{"}</span>
                <Text size="s2" weight="400" uppercase>
                  instagram
                </Text>
                <span>{"}"}</span>
              </Flex>
            </CustomLink>
            <CustomLink href="https://twitter.com/VetmeToken?t=iydy_59nL4QSNB2YfQ8CIA&s=09">
              <Flex align="center">
                {" "}
                <span>{"{"}</span>
                <Text size="s2" weight="400" uppercase>
                  facebook
                </Text>
                <span>{"}"}</span>
              </Flex>
            </CustomLink>
            <CustomLink href="https://twitter.com/VetmeToken?t=iydy_59nL4QSNB2YfQ8CIA&s=09">
              <Flex align="center">
                <span>{"{"}</span>
                <Text size="s2" uppercase>
                  twitter
                </Text>
                <span>{"}"}</span>
              </Flex>
            </CustomLink>
          </Flex>
          <CurvyBox>
            <Text uppercase size="s3">
              vetme ©2022
            </Text>
          </CurvyBox>
        </FooterWrapper>
      </div>
    </FooterContainer>
  );
};

export default Footer;
