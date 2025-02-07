import './App.css'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Search from './pages/Search'
import Messages from './pages/Messages'
import Settings from './pages/Settings'
import Login from './pages/Login'
import Register from './pages/Register'
import Whizzes from './pages/Whizzes'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Feed />} />
        <Route path="/whizzes" element={<Whizzes />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
