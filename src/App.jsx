import { Route, Routes } from 'react-router'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Manager from './pages/Manager.jsx'

function App() {
   return (
      <Routes>
         <Route path='/' element={<Register />}></Route>
         <Route path='/login' element={<Login />}></Route>
         <Route path='/manager' element={<Manager />}></Route>
      </Routes>
   )
}

export default App
