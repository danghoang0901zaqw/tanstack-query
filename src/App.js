import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailStudent from "./pages/Detail";
import HomePage from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Routes>
        <Route path="/students/:id" element={<DetailStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
