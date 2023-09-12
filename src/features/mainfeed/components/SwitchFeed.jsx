import { Link } from 'react-router-dom'
import '../../../assets/styles/switchFeed.css'


const SwitchFeed = ({ switcher, setSwitcher, activeClass }) => {

  return (
    <div className={`container-switch-feed ${activeClass ? 'h-svh-btn' : 'h-vh'}`}>
      <button onClick={() => setSwitcher('feed')}
        className={switcher === 'feed' ? 'button-switch-active' : null}>
        Feed
      </button>
      <button onClick={() => setSwitcher('home')}
        className={switcher === 'home' ? 'button-switch-active' : null}>
        Home
      </button>
    </div>
  )
}

export default SwitchFeed
