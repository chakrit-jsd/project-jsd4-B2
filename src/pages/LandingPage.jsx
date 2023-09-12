import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { Link, useNavigate } from "react-router-dom"
import { getLogin, getSlackLogin, postLogin } from "../services/API/authAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "../utils/validators/validateLogin"
import ControlledCarousel from "../components/bootstrap/ControlledCarousel"
import '../assets/styles/landingPage.css'
import HelmetTitle from "../components/shared/Helmet"

const LandingPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(schema)})
  const [ resMessage, setResMessage ] = useState()
  const onSubmit = async (data) => {
    try {
      // if (typeof document.hasStorageAccess !== 'function') {
      //   // This browser doesn't support the Storage Access API
      //   // so let's just hope we have access!
      //   const res = await postLogin(data)
      // } else {
      //   const hasAccess = await document.hasStorageAccess();
      //   if (hasAccess) {
      //     // We have access to unpartitioned cookies, so let's go
      //     const res = await postLogin(data)
      //   } else {
      //     // Check whether unpartitioned cookie access has been granted
      //     // to another same-site embed
      //     const permission = await navigator.permissions.query({
      //       name: "storage-access",
      //     });

      //     if (permission.state === "granted") {
      //       // If so, you can just call requestStorageAccess() without a user interaction,
      //       // and it will resolve automatically.
      //       await document.requestStorageAccess();
      //       const res = await postLogin(data)
      //     } else if (permission.state === "prompt") {
      //       // Need to call requestStorageAccess() after a user interaction
      //       setBtnPromt(true)
      //       const btn = document.getElementById('allowcookie')
      //       btn.addEventListener("click", async (event) => {
      //         event.preventDefault()
      //         try {
      //           await document.requestStorageAccess();
      //           const res = await postLogin(data)
      //         } catch (err) {
      //           // If there is an error obtaining storage access.
      //           console.error(`Error obtaining storage access: ${err}.
      //                         Please sign in.`);
      //         }
      //       });
      //     } else if (permission.state === "denied") {
      //       // User has denied unpartitioned cookie access, so we'll
      //       // need to do something else
      //     }
      //   }
      // }
      const res = await postLogin(data)
      navigate('/me')
    } catch (error) {
      const res = httpErrorCode(error)
      setResMessage(res.message || error)
    }

  }

  useEffect(() => {
    const getPage = async () => {
      try {
        const res = await getLogin()
      } catch (error) {
        const res = httpErrorCode(error)
        console.log(res.message)
        if (res.status !== 200)
        navigate('/me')
      }
    }
    getPage()
  }, [])
  // const [storageAccessGranted, setStorageAccessGranted] = useState(false);
  // const allowAccess = async (event) => {
  //   event.preventDefault()
  //   try {
  //     await window.navigator.storage.requestPersistent();
  //     setStorageAccessGranted(true);
  //     // อื่นๆที่คุณต้องการทำหลังจากได้รับอนุญาติ
  //   } catch (error) {
  //     console.error('ไม่สามารถขออนุญาติใช้งานได้:', error);
  //   }
  // }
  const slackLogin = async (event) => {
    event.preventDefault()
    try {
      const res = await getSlackLogin()
      console.log(res)
    } catch (error) {
      console.log('sssssssssssssssssssssssssss',error)
    }
  }
  return (
    <div className="container-main-landing">
      <HelmetTitle title='Landing | Nest-Fit by JSD#4 B2'/>
      <nav className="nav-landing">
        <div onClick={() => window.scrollTo(0, 0)} className="nav-logo">
          <img src="static/img/Nest-fit-logo.png" alt="logo-nest-fit" style={{ width: 100}}/>
        </div>
        <div className="nav-link">
          <a href='#login' className="nav-link-login">Login</a>
          <div></div>
          <Link to='/register' className="nav-link-register">Register</Link>
        </div>
      </nav>
      <main className="container-main-content-landing">
        <div className="container-content-1">
          <div className="content-1-1">
            <img src="static/img/Woman-page-1.png" alt="" />
          </div>
          <div className="content-1-2">
            <h1>What's <span>Nest</span>Fit</h1>
            <p>Welcome to NestFit - where fitness is fun! With our all-in-one features, state-of-the-art workouts, and a supportive community, achieving your fitness goals has never been more enjoyable. Let's unleash your potential together and start your fitness journey with NestFit today!</p>
            <Link to='/register'>Join Our Squad!</Link>
          </div>
          <div className="content-1-3">
            <img src="static/img/component on page 1-1.png" alt="" />
          </div>
        </div>
        <div className="container-content-2">
          <div className="container-head-content-2">
            <h1>Let’s Get Tired!</h1>
            <p>NestFit offers five types of home workouts, including weight lifting, yoga, HIIT, strength training, and pilates. </p>
            <p>With our app, you can access a variety of workouts from the comfort of your own home - no gym required.</p>
            <p> Whether you're short on time or prefer working out at home, NestFit has got you covered.</p>
          </div>
          <ControlledCarousel />
        </div>
        <div className="container-content-3">
          <div className="container-head-content-3">
            <h1>The Ultimate Fitness App</h1>
            <p>"Unlock your full fitness potential with our app's cutting-edge features” </p>
          </div>
          <img src="static/img/headphones-smartphone-dumbbells.jpg" alt="" />
        </div>
        <div className="container-content-4">
          <div className="container-left-content-4">
            <h2>Workout <span>Analytics</span></h2>
            <p>Track your fitness progress with detailed workout history</p>
            <p>Analyze your workout data with easy-to-read graphs and charts</p>
            <p>Stay motivated with visual representations of your progress</p>
          </div>
          <img src="static/img/img-content-4.png" alt="img-content-4" />
        </div>
        <div className="container-content-5">
          <img src="static/img/img-content-5.jpg" alt="img-content-5" />
          <div className="container-right-content-5">
            <h2><span>Connect</span> with Others</h2>
            <p>Access to a community of like-minded fitness enthusiasts</p>
            <p>Get support and encouragement from your connections to stay on track</p>
            <p>Discover new workout routines, tips, and ideas from other users to spice up your fitness routine.</p>
          </div>
        </div>
        <div className="container-content-6">
          <div className="container-left-content-6">
            <h2>Stay In <span>Shape</span></h2>
            <p>Maintain your fitness routine and stay motivated to achieve your goals</p>
            <p>Integration with devices to track your progress and keep you active</p>
            <p>Stick to your fitness journey and continue to improve your health and well-bein</p>
          </div>
          <img src="static/img/img-content-6.jpg" alt="img-content-6" />
        </div>
        <div className="container-content-7">
          <img src="static/img/orange juice.jpg" alt="" />
          <div id='login' className="container-login">
            <form>
              <p className='error-login'>{resMessage}</p>
              <div className="content-7-input">
                <span>Email</span>
                <span className='error-login'><ErrorMessage errors={errors} name='email' /></span>
                <input type="text" {...register('email')} />
              </div>
              <div className="content-7-input">
                <span>Password</span>
                <span className='error-login'><ErrorMessage errors={errors} name='password' /></span>
                <input type="password" {...register('password')} />
              </div>
              <div className="content-7-btn">
                {/* {storageAccessGranted ? null : <button onClick={allowAccess}>Allow Cookie</button>} */}
                {/* {btnPromt ? <button id="allowcookie">allow</button> : null } */}
                <button type="submit" onClick={handleSubmit(onSubmit)}>LOGIN</button>
                <Link to='/register'>Register</Link>
              </div>
              {/* <button onClick={slackLogin}>Slack</button> */}


              <Link to='https://nestfit-api.life/api/login/slack' className="a-slack">
                <img src="static/img/slack.png" alt=""/>
                {/* <img src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /> */}
              </Link>
            </form>
          </div>
        </div>
      </main>
    </div>

  )
}

export default LandingPage
