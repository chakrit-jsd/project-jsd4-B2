import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../../../assets/styles/switchFeed.css'


const SwitchFeed = () => {
  const [ switcher, setSwitcher ] = useState('feed')

  const handleSwitch = () => {
  }

  return (
    <div className="container-switch-feed">
      <button onClick={() => setSwitcher('feed')}
        className={switcher === 'feed' ? 'button-switch-active' : null}>
        <Link to='/main/me'>Feed</Link>
      </button>
      <button onClick={() => setSwitcher('home')}
        className={switcher === 'home' ? 'button-switch-active' : null}>
        <Link to='/main/other'>My home</Link>
      </button>
    </div>
  )
}

export default SwitchFeed
