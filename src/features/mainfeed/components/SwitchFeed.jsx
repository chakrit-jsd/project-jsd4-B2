import { useState } from 'react'
import '../../../assets/styles/switchFeed.css'


const SwitchFeed = () => {
  const [ switcher, setSwitcher ] = useState('feed')

  const handleSwitch = () => {
  }

  return (
    <div className="container-switch-feed">
      <button onClick={() => setSwitcher('feed')}
        className={switcher === 'feed' ? 'button-switch-active' : null}
        >Feed</button>
      <button onClick={() => setSwitcher('home')}
        className={switcher === 'home' ? 'button-switch-active' : null}
      >My Home</button>
    </div>
  )
}

export default SwitchFeed
