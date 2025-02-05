import './App.css'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/register/RegisterForm'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Logo from './assets/Logo'
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import Notifications from './pages/Notifications'
import Search from './pages/Search'
import Messages from './pages/Messages'
import Settings from './pages/Settings'

function Login() {
  return (
    <>
      <Logo />
      <LoginForm />
    </>
  );
}

function Register() {
  return (
    <>
      <Logo />
      <RegisterForm />
    </>
  );
}

function MainPage() {

  return (
    <>
      <Feed/>
    </>)
}

function ProfilePage () {
  return (
    <>
      <Profile/>
    </>
  )
}

function NotificationsPage() {
  return (
    <>
      <Notifications />
    </>
  );
}

function SearchPage() {
  return (
    <>
      <Search />
    </>
  );
}

function MessagesPage() {
  return (
    <>
      <Messages />
    </>
  );
}

function SettingsPage() {
  return (
    <>
      <Settings />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
