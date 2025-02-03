import './App.css'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/register/RegisterForm'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Logo from './assets/Logo'
import MenuBar from './components/menuBar/MenuBar'

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
      <Logo />
      <MenuBar />
    </>)
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
