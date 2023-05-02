import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../assets/styles/switchFeed.css'


const SwitchFeed = () => {
  const [ switcher, setSwitcher ] = useState('feed')

  const handleSwitch = () => {
  }

  return (
    <div className="container-switch-feed">
      <Link to='/main/me' onClick={() => setSwitcher('feed')}
        className={switcher === 'feed' ? 'button-switch-active' : null}>
        Feed
      </Link>
      <Link to='/main/other' onClick={() => setSwitcher('home')}
        className={switcher === 'home' ? 'button-switch-active' : null}>
        Home
      </Link>
    </div>
  )
}

export default SwitchFeed
