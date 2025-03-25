import "./App.css";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Whizzes from "./pages/Whizzes";

function Layout({ children }) {
  const location = useLocation();
  const specialBackground = ["/main", "/profile"]

  return (
    <>
    <div className={`background-container ${specialBackground.includes(location.pathname) ? "special-background" : "default-background"}`}></div>
      <div className="content-container">
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Feed />} />
          <Route path="/whizzes" element={<Whizzes />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
