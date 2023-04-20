import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import Routing from './Routing'

ReactDOM.createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
      <Router>
        <Routing />
      </Router>
    </React.StrictMode>,
  )
