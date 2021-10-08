import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100)
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route {...rest} render={() => {
      return fakeAuth.isAuthenticated === true
        ? children
        : <Redirect to='/login' />
    }} />
  )
}


const Public = () => <h3>Public</h3>
const Protected = () => <h3>Protected</h3>
const Login = () => {
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);

  const login = () => {
    fakeAuth.authenticate(() => {
      setRedirectToReferrer(true)
    })
  }

  if (redirectToReferrer === true) {
    return <Redirect to='/' />
  }

  return (
    <div>
      <p>You must log in to view Page</p>
      <button onClick={login}>Log in</button>
    </div>
  )
}


function App() {
  return (
    <Router>
      <div>
        <ul>
          <li><Link to='/public'>Public Page</Link></li>
          <li><Link to='/protected'>Protected Page</Link></li>
        </ul>

        <Route path='/public'>
          <Public />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <PrivateRoute path='/protected'>
          <Protected />
        </PrivateRoute>
      </div>
    </Router>
  );
}

export default App;
