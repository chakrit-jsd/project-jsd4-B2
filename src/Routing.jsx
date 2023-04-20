import { Route, Routes } from 'react-router-dom'
import { Footer } from './components/shared/Footer'
import Register from './pages/Register'
import Test from './pages/Test'
// import TestInput from './pages/TestInput'
import Main from './pages/Main'

function Routing() {

  return (
    <Routes>
      <Route path='/' element={<Footer />} />
      <Route path='/main' element={<Main />} >
        {/* <Route index path='/me' element={<Main />} />
        <Route path='/other' element={<Main />} /> */}
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  )
}

export default Routing
