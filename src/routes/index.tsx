import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import Home from "@/pages/home";
import Hiw from "@/pages/hiw";
import Faq from "@/pages/faq";
import Stakes from "@/pages/stakes";
import StakingV1 from "@/pages/staking_v1";
import { MainLayout } from "@/components/Layouts";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/stakes" element={<Stakes />} />
          <Route path="/how-to" element={<Hiw />} />
          <Route path="/v1" element={<StakingV1 />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
