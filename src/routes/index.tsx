import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../index.css";
import Home from "@/pages/home";
import { MainLayout } from "@/components/Layouts";

function AllRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AllRoutes;
