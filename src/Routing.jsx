import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Test from './pages/Test'
// import TestInput from './pages/TestInput'
import Main from './pages/Main'
import LandingPage from './pages/LandingPage'

function Routing() {

  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/user' element={<Main />} >
        {/* <Route index path='/user/:userId' element={<Main />} />
        <Route path='/user/other' element={<Main />} /> */}
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  )
}

export default Routing
