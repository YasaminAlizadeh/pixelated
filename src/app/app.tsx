import Layout from "components/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Mobile from "./pages/mobile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/mobile" element={<Mobile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
