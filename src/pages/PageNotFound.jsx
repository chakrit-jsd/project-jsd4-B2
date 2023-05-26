import { Link } from "react-router-dom"
import '../assets/styles/pageNotFound.css'
const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <h1>Page Not Found</h1>
      <Link to='/me'>Back</Link>
    </div>
  )
}

export default PageNotFound
