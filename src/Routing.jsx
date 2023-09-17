import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Main from './pages/Main'
import LandingPage from './pages/LandingPage'
import MainAnother from './pages/MainAnother'
import PageNotFound from './pages/PageNotFound'
import PageMain from './pages/PageMain'

function Routing() {
  return (
    <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/me' element={<PageMain />} >
        {/* <Route index path='/me/feed' element={<PageMain />} />
        <Route path='/me/home' element={<PageMain />} /> */}
      </Route>
      <Route path='/another/:userId' element={<PageMain />} />
      <Route path='/register' element={<Register />} />
      <Route path='/notfound' element={<PageNotFound />} />
    </Routes>
  )
}

export default Routing
