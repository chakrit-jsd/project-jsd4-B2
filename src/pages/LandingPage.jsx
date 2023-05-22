import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { ErrorMessage } from '@hookform/error-message'
import { Link, useNavigate } from "react-router-dom"
import { getLogin, postLogin } from "../services/API/authAPI"
import { httpErrorCode } from "../utils/errorsHandle/httpStatuscode"
import { yupResolver } from "@hookform/resolvers/yup"
import schema from "../utils/validators/validateLogin"
import ControlledCarousel from "../components/bootstrap/ControlledCarousel"
import '../assets/styles/landingPage.css'

const LandingPage = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({ mode: 'onBlur', reValidateMode: 'onChange', resolver: yupResolver(schema)})
  const [ resMessage, setResMessage ] = useState()
  const onSubmit = async (data) => {
    try {
      const res = await fetch('http://localhost:3002/api/login', {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin// *default, no-cache, reload, force-cache, only-if-cached
        credentials: "include", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      const resData = await res.json()
      console.log(res.headers)
      // const res = await postLogin(data)
      console.log(res.headers.get('Set-Cookie'))
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

  return (
    <div className="container-main-landing">
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
                <button type="submit" onClick={handleSubmit(onSubmit)}>LOGIN</button>
                <Link to='/register'>Register</Link>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>

  )
}

export default LandingPage
