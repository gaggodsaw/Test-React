import { BrowserRouter, Route, Routes } from "react-router-dom";

// Style
import "./App.scss";

// Pages
import Home from "./pages/home/Home";
import LayoutStyle from "./pages/layout-style/LayoutStyle";
import FormTable from "./pages/form-table/FormTable";
import NotFound from "./pages/not-found/NotFound";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/layout-style" element={<LayoutStyle />} />
        <Route path="/form-table" element={<FormTable />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
