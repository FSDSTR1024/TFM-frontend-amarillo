import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Logo from './components/Logo'

function Login() {

  return (
    <>
      <Logo />
      <LoginForm />
    </>
  )
}

function Register() {

  return (
    <>
      <Logo />
      <RegisterForm />
    </>
  )
}

function MainPage() {

  return (
    <>
      <Logo />
      <h1>Whiz!</h1>
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
  )
}

export default App