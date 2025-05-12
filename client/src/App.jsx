import { useState } from 'react'
import {Route,Routes,Navigate} from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function App() {
  const [count, setCount] = useState(0)

  // let authUser=true;
  let authUser=false;
  return (
   <div className='flex flex-col items-center'>
    <Routes>
      <Route path='/' element={
        authUser? <Navigate to={'/home'}/> :
        <Navigate to={'/login'}/>
      }/>
      <Route path='/login' element={
        !authUser?
        <LoginPage/> :
        <Navigate to={'/home'}/>
      }/>
      <Route path='/signup' element={
        !authUser?
        <SignupPage/> :
        <Navigate to={'/home'}/>
      }/>
      <Route path='/home' element={
        authUser? <HomePage/> :
        <Navigate to={'/login'}/>
        }/>
    </Routes>
    App
   </div>
  )
}

export default App

