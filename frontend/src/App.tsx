// import { useState } from 'react'
import { SigninPage } from './pages/SigninPage'
import { SignUpPage } from './pages/SignUpPage'
import {HomePage} from "./pages/HomePage"
import {Route, Routes,Navigate} from "react-router-dom"
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'
function App() {
 
  const {authUser,getMe,isCheckingAuth} = useAuthStore();

   useEffect(() => {
    
  getMe();
   
  }, [getMe])

   console.log("Auth state:", { authUser, isCheckingAuth });

  if (isCheckingAuth && !authUser) {
    return <div>Loading authentication...</div>; // Show loading indicator
  }
  
  return (
    <>
    <Routes  >    
      <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
      <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <SigninPage /> : <Navigate to="/" />}
        />
      
  </Routes>
    </>
  )
}

export default App
