import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Player from "./pages/player/Player";
import Summary from "./pages/summary/Summary";
import Calendar from "./pages/calendar/Calendar";
import { ChatBot } from "./components/chatbot/ChatBot";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Admin from "./pages/admin/Admin";
import Search from "./pages/search/Search";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/watch/:id" element={<Player />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
      <ChatBot />
    </>
  );
};
export default Router;
