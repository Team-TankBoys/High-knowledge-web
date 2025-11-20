import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import School from "./pages/School";
import Post from "./pages/Post";
import Write from "./pages/Write";
import NotFound from "./pages/NotFound";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/school/:id" element={<School />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/write/:schoolId" element={<Write />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
