import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import PrivateRoute from "./components/PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";
import About from "./pages/About";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Homes";
import PostPage from "./pages/PostPage";
import Projects from "./pages/Projects";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import UpdatePost from "./pages/UpdatePost";

export default function App() {
  return (
    <BrowserRouter>
      {/* To be able to have it in all page must be inside the browserroute and outside of routes */}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/project" element={<Projects />} />
        <Route path="/post/:postSlug" element={<PostPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
