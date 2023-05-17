import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Test from './pages/Test'
// import TestInput from './pages/TestInput'
import Main from './pages/Main'
import LandingPage from './pages/LandingPage'
import MainAnother from './pages/MainAnother'

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/me' element={<Main />} >
        <Route index path='/me/feed' element={<Main />} />
        <Route path='/me/home' element={<Main />} />
      </Route>
      <Route path='/another/:userId' element={<MainAnother />} />
      <Route path='/register' element={<Register />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  )
}

export default Routing
