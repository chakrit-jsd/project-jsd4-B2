import { CircularProgress } from "@mui/material"

const ProgressSwitcher = ({ switcher }) => {
  return(
    <div className="progress-circle">
      <p>{switcher === 'feed' ? 'Feed' : 'Home'}</p>
      <CircularProgress className="circle" color="inherit" />
    </div>
  )
}

export default ProgressSwitcher
