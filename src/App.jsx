import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import { Outlet } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import { Footer } from './components/Footer'



function App() {
  const [count, setCount] = useState(0)

  return (
   <>

   <AuthProvider>


  <Nav/>

   <Outlet/>

  <Footer/>
   </AuthProvider>
   </>
  )
}

export default App
