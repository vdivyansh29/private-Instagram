import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  // const [count, setCount] = useState(0)
  // const [user, setUser] = useState({})

  // async function getData(){
  //   try {
  //     const res = await fetch("http://localhost:7000/divyansh")
  //     const data = await res.json()
  //     console.log(data, "DATA FROM BACKEND")
  //     setUser(data)


  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  // console.log(user,"USER HAI BEY")

  // useEffect(()=>{
  //   getData()
  // },[])


  return (
    <>
      <div className="App">
        <h1>Private Instagram</h1>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>

      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
