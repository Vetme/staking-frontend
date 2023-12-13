import { useEffect, useState } from "react";
import {
  NavContainer,
  NavWrapper,
  NavItems,
  Item,
  Logo,
  Action,
  Bar,
  MobileMenu,
  MMenuItem,
  MMenuInner,
  IconM,
  DropDownCon,
  MMenuR,
} from "./styles";
//ChainWrapper
import { useLocation, useNavigate } from "react-router-dom";
import { Center, Flex, Spacer, Overlay } from "../";
import { Button } from "@/components/Button";
import { truncate } from "@/helpers";
import { Decor, LogoSVG, Wallet, Logout } from "../Icons";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

const Navigation = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const { open: openModal, close: closeModel } = useWeb3Modal();
  // const [cMenu, setCMenu] = useState<boolean>(false);

  const location = useLocation();
  const navigate = useNavigate();
  // const allChains = useMemo(() => chains, []);
  const { address } = useAccount();

  let prevScroll = 0;

  const header: HTMLElement | null = document.getElementById("nav");
  const checkScroll = () => {
    const curScroll = window.pageYOffset;

    if (curScroll <= 0) {
      header?.classList.remove("scroll-up");
    }

    if (curScroll > prevScroll && !header?.classList.contains("scroll-down")) {
      header?.classList.remove("scroll-up");
      header?.classList.add("scroll-down");
    }

    if (curScroll < prevScroll && header?.classList.contains("scroll-down")) {
      header?.classList.remove("scroll-down");
      header?.classList.add("scroll-up");
    }
    prevScroll = curScroll;
  };

  window.addEventListener("scroll", checkScroll);

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [location]);

  return (
    <>
      <NavContainer id="nav">
        <div className="container">
          <NavWrapper>
            <Logo to="/">
              <LogoSVG />
            </Logo>

            <Action>
              <NavItems style={{ marginRight: 20 }}>
                <Item to="/v1">
                  <span>V1</span>
                </Item>
                <Item to="/how-to">
                  <span>How to</span>
                </Item>
                <Item to="/faq">
                  <span>FAQ</span>
                </Item>
              </NavItems>
              {/* <ChainWrapper>
                <Button
                  onClick={() => setCMenu((prev) => !prev)}
                  className="secondary"
                >
                  Etheriem
                  <AngleDown />
                </Button>

                <DropDownCon className={cMenu ? "active" : ""}>
                  {allChains.map((chain: number, i: number) => (
                    <ListItem key={i} onClick={() => handleSetChain(chain)}>
                      <div className="icon">
                        <img src={chain.logoUrl} />
                      </div>
                      {chain.name}
                    </ListItem>
                  ))}
                </DropDownCon>
              </ChainWrapper> */}
              <Spacer width={8} />
              {address ? (
                <Flex align="center">
                  <Button
                    onClick={() => setMenu((prev) => !prev)}
                    className="secondary"
                  >
                    <Wallet />
                    {truncate(address || "", 9)}
                  </Button>
                </Flex>
              ) : (
                <Button className="primary " onClick={() => openModal()}>
                  Connect Wallet
                </Button>
              )}
              <DropDownCon className={menu ? "active" : ""}>
                <MMenuItem style={{ textAlign: "start" }} to="/stakes">
                  My Stakes
                </MMenuItem>
                <Button onClick={() => closeModel()} className="primary ">
                  <Logout />
                  Disconnect
                </Button>
              </DropDownCon>
            </Action>
            <MMenuR>
              <Bar
                className={open ? "opened" : ""}
                onClick={() => setOpen(!open)}
              >
                <div></div>
              </Bar>
            </MMenuR>
            <MobileMenu className={open ? "added" : ""}>
              <IconM>
                <Decor />
              </IconM>
              <MMenuInner>
                <MMenuItem to="/v1">V1</MMenuItem>
                <MMenuItem to="/how-to">How to</MMenuItem>
                <MMenuItem to="/faq">Faq</MMenuItem>

                <Spacer height={32} />
                <Center>
                  {address ? (
                    <Flex align="center">
                      <Button
                        onClick={() => navigate("/dashboard")}
                        className="secondary "
                      >
                        <Wallet /> {truncate(address || "", 9)}{" "}
                      </Button>
                    </Flex>
                  ) : (
                    <Button className="primary" onClick={() => openModal()}>
                      Connect Wallet
                    </Button>
                  )}
                </Center>
                <Spacer height={12} />
              </MMenuInner>
            </MobileMenu>
          </NavWrapper>
        </div>
        {open && <Overlay />}
      </NavContainer>
    </>
  );
};

export default Navigation;
