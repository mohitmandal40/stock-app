import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import StockList from "./pages/StockList";
import StockDetails from "./pages/StockDetails";
import Layout from "./components/common/Layout";
import News from "./pages/News";

function App() {
  const RedirectToStock = () => <Navigate to="/stock" replace />;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<RedirectToStock />} />
          <Route path="stock" element={<StockList />} />
          <Route path="stock/:symbol" element={<StockDetails />} />
          <Route path="news" element={<News />} />
          <Route path="*" element={<RedirectToStock />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
