import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Player from "./pages/player/Player";
import Summary from "./pages/summary/Summary";
import Calendar from "./pages/calendar/Calendar";
import { ChatBot } from "./components/chatbot/ChatBot";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/watch/:id" element={<Player />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/summary" element={<Summary />} />
        </Routes>
      </BrowserRouter>
      <ChatBot />
    </>
  );
};
export default Router;
