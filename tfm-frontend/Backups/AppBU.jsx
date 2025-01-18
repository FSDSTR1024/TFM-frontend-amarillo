import whizlogo from './assets/Whiz[1].svg'
import './App.css'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <>
      <div>
        <img src={whizlogo} className="logo" alt="Whiz logo" />
      </div>
      {showLogin ? (
        <LoginForm onSwitchForm={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onSwitchForm={() => setShowLogin(true)} />
      )}
    </>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
    </Router>
  )
}

export default App