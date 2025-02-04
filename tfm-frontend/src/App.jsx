import './App.css'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/register/RegisterForm'
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import Logo from './assets/Logo'
import Feed from './pages/Feed'
import Profile from './pages/Profile'

 

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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Routes>
    </Router>
  );
}

export default App;
