import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NavigateMenu from "./components/NavigateMenu";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main_container">
          <div className="navigate_container">
            <NavigateMenu />
          </div>
          <div className="page_container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}