import '../../assets/styles/footerMobile.css'

const Footer = ({ mobileShow, setMobileShow, activeClass, user }) => {
  return (
    <>
      <footer className={`footer-mobile ${activeClass ? 'h-svh' : 'h-vh' }`}>
        <div className='container-btn-footer'>
          <button onClick={() => setMobileShow('profile')}>
            <i className={`bi bi-person${mobileShow === 'profile' ? '-fill' : ' color-dis'}`}></i>
            <p>Profile</p>
          </button>
          {mobileShow === 'feed' && user.thisme ? <p className='profilename'>{user.profilename || `${user.firstname}  ${user.lastname}`}</p> : null}
          {mobileShow !== 'feed' ? <button onClick={() => setMobileShow('feed')}>
            <i className={`bi bi-collection${mobileShow === 'feed' ? '-fill' : ' color-dis'}`}></i>
            <p>Feed</p>
          </button> : null}
          <button onClick={() => setMobileShow('dashboard')}>
            <i className={`bi bi-pie-chart${mobileShow === 'dashboard' ? '-fill' : ' color-dis'}`}></i>
            <p>Chart</p>
          </button>
        </div>
      </footer>
    </>
  )
}


export default Footer
