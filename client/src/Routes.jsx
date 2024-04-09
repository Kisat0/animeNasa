import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Player from "./pages/player/Player";
import Summary from "./pages/summary/Summary";
import Calendar from "./pages/calendar/Calendar";
import { ChatBot } from "./components/chatbot/ChatBot";
import News from "./pages/news/News";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Admin from "./pages/admin/Admin";
import Search from "./pages/search/Search";
import { useAuth } from "./utils/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const Router = () => {
  return (
    <>
      <BrowserRouter>
          <PrivateRoute />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/search" element={<Search />} />
          <Route path="/news" element={<News />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/admin" element={<Admin />} />

          <Route path="/watch/:id" element={<Player />} />
          <Route path="/summary/:id" element={<Summary />} />

          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </BrowserRouter>
      <ChatBot />
    </>
  );
};

export default Router;
