import { Link } from 'react-router-dom'
import '../../../assets/styles/switchFeed.css'


const SwitchFeed = ({ setSwitcher, activeClass }) => {

  return (
    <div className={`container-switch-feed ${activeClass ? 'h-svh-btn' : 'h-vh'}`}>
      <Link to='/me/feed' onClick={() => setSwitcher('feed')}
        className={location.pathname === '/me/feed' || location.pathname === '/me' ? 'button-switch-active' : null}>
        Feed
      </Link>
      <Link to='/me/home' onClick={() => setSwitcher('home')}
        className={location.pathname === '/me/home' ? 'button-switch-active' : null}>
        Home
      </Link>
    </div>
  )
}

export default SwitchFeed
