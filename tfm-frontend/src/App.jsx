import whizlogo from './assets/Whiz[1].svg'
import './App.css'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'

function Login() {

  return (
    <>
      <div>
        <img src={whizlogo} className="logo" alt="Whiz logo" />
      </div>
      <LoginForm />
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