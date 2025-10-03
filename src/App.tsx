import { BrowserRouter, Routes, Route } from "react-router";
import { Home } from "@/pages/Home";
import { GamePage } from "@/pages/GamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:gameId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
