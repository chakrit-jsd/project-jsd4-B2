import { Link } from 'react-router-dom'
import '../../../assets/styles/switchFeed.css'


const SwitchFeed = ({ switcher, setSwitcher}) => {

  const handleSwitch = () => {
  }



  return (
    <div className="container-switch-feed">
      <Link to='#' onClick={() => setSwitcher('feed')}
        className={switcher === 'feed' ? 'button-switch-active' : null}>
        Feed
      </Link>
      <Link to='#' onClick={() => setSwitcher('home')}
        className={switcher === 'home' ? 'button-switch-active' : null}>
        Home
      </Link>
    </div>
  )
}

export default SwitchFeed
