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
  ChainWrapper,
} from "./styles";

import { useLocation, useNavigate } from "react-router-dom";
import { Center, Flex, Spacer, Overlay } from "../";
import { Button } from "@/components/Button";
import { truncate } from "@/helpers";
import { Decor, LogoSVG, Wallet, Logout, AngleDown } from "../Icons";

const Navigation = () => {
  const [, setShow] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [menu, setMenu] = useState<boolean>(false);
  const [cMenu, setCMenu] = useState<boolean>(false);
  const [account] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  // const allChains = useMemo(() => chains, []);
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
            <NavItems>
              <Item to="/">
                <span>Home</span>
              </Item>
              <Item to="p2p">
                <span>P2P Escrow</span>
              </Item>
              {/* <Item to="swap">
                <span>Swap</span>
              </Item> */}
              <a
                className="item"
                download
                target="_blank"
                href="https://vetmeblock.com/assets/whitepaper.pdf"
              >
                <span>White Paper</span>
              </a>
              <Item to="/how-to">How to</Item>
            </NavItems>
            <Action>
              <ChainWrapper>
                <Button
                  onClick={() => setCMenu((prev) => !prev)}
                  className="secondary"
                >
                  Etheriem
                  <AngleDown />
                </Button>

                <DropDownCon className={cMenu ? "active" : ""}>
                  {/* {allChains.map((chain: number, i: number) => (
                    <ListItem key={i} onClick={() => handleSetChain(chain)}>
                      <div className="icon">
                        <img src={chain.logoUrl} />
                      </div>
                      {chain.name}
                    </ListItem>
                  ))} */}
                </DropDownCon>
              </ChainWrapper>
              <Spacer width={8} />
              {account ? (
                <Flex align="center">
                  <Button
                    onClick={() => setMenu((prev) => !prev)}
                    className="secondary"
                  >
                    <Wallet />
                    {truncate(account || "", 9)}
                  </Button>
                </Flex>
              ) : (
                <Button className="primary " onClick={() => setShow(true)}>
                  Connect Wallet
                </Button>
              )}
              <DropDownCon className={menu ? "active" : ""}>
                <MMenuItem style={{ textAlign: "start" }} to="/dashboard">
                  My Trades
                </MMenuItem>
                <Button className="primary ">
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
                <MMenuItem to="/">Home</MMenuItem>
                <MMenuItem to="p2p">P2P Escrow</MMenuItem>
                {/* <MMenuItem to="swap">Swap</MMenuItem> */}
                {/* <MMenuItem to="test-tokens">Test Tokens</MMenuItem> */}
                <MMenuItem
                  target="_blank"
                  to="https://vetmeblock.com/assets/whitepaper.pdf"
                >
                  White Paper
                </MMenuItem>
                <MMenuItem to="/how-to">How to</MMenuItem>

                <Spacer height={32} />
                <Center>
                  {account ? (
                    <Flex align="center">
                      <Button
                        onClick={() => navigate("/dashboard")}
                        className="secondary "
                      >
                        <Wallet /> {truncate(account || "", 9)}{" "}
                      </Button>
                    </Flex>
                  ) : (
                    <Button className="primary" onClick={() => setShow(true)}>
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
