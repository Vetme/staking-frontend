import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer, BodyWrapper } from "@/components";
import TopBarProgress from "react-topbar-progress-indicator";
import Navigation from "@/components/Nav";

TopBarProgress.config({
  barColors: {
    "0": "#170728",
    "0.7": "#ABE5B9",
  },
  barThickness: 2,
  shadowBlur: 0,
});

const MainLayout = () => {
  const [progress, setProgress] = useState(false);
  const [prevLoc, setPrevLoc] = useState("");
  const location = useLocation();

  useEffect(() => {
    setPrevLoc(location.pathname);
    setProgress(true);
    if (location.pathname === prevLoc) {
      setPrevLoc("");
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLoc]);
  return (
    <div className="flex flex-col">
      <Navigation />
      {progress && <TopBarProgress />}

      <BodyWrapper>
        <Outlet />
      </BodyWrapper>
      <Footer />

      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
