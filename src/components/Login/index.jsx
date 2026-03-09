import {Component} from 'react'
import Cookies from 'js-cookie'
import {Navigate} from 'react-router-dom'
import './index.css'
import withRouter from '../withRouter'

class Login extends Component {
  state = {
    isMasked: true,
    userPassword: '',
    username: '',
    isError: false,
    errMsg: '',
  }

  changeThePassword = event => {
    this.setState({userPassword: event.target.value})
  }

  changeTheUsername = event => {
    this.setState({username: event.target.value})
  }

  changeTheIsMasked = () => {
    this.setState(prevState => ({isMasked: !prevState.isMasked}))
  }

  onSuccessSubmit = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    console.log("success")
    this.props.navigate("/")
  }

  submitTheForm = async event => {
    event.preventDefault()
    console.log("submiteventtriggered")
    const {username, userPassword} = this.state
    const userDetails = {username, password: userPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log("fetch success")
    if (response.ok === true) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      console.log(data)
      this.setState({isError: true, errMsg: data.error_msg})
    }
  }

  render() {
    const {isMasked, userPassword, username, isError, errMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Navigate to="/" />
    }

    return (
      <div className="login-container">
        <div className="form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form className="form" onSubmit={this.submitTheForm}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="input"
              placeholder="username"
              onChange={this.changeTheUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            {isMasked && (
              <input
                type="password"
                id="password"
                value={userPassword}
                className="input"
                placeholder="Password"
                onChange={this.changeThePassword}
              />
            )}
            {!isMasked && (
              <input
                type="text"
                id="password"
                value={userPassword}
                placeholder="Password"
                className="input"
                onChange={this.changeThePassword}
              />
            )}
            <div>
              <input
                type="checkbox"
                id="checkbox"
                className="checkbox"
                onClick={this.changeTheIsMasked}
              />
              <label htmlFor="checkbox">Show Password</label>
            </div>
            <button type="submit" className="white-button">
              Login
            </button>
            {isError && <p className="error-para">*{errMsg}</p>}
          </form>
        </div>
        <div className="user-credentials">
          <button type="button" className="white-button">user credentials</button>
          <p>username : rahul</p>
          <p>password : rahul@2021</p>
        </div>
      </div>
    )
  }
}


const LoginWithRouter = withRouter(Login)

export default LoginWithRouter
