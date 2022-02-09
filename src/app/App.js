import './App.css';
import React, {Component} from "react";
import {
  Route,
  Routes
} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import AppHeader from '../common/AppHeader';
import { ACCESS_TOKEN } from '../constants';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import { getCurrentUser } from '../util/APIUtils';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true
    }

    this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  loadCurrentlyLoggedInUser() {
    getCurrentUser()
    .then(response => {
      this.setState({
        currentUser: response,
        authenticated: true,
        loading: false
      });
    }).catch(error => {
      this.setState({
        loading: false
      });  
    });    
  }

  handleLogout() {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
  }

  async componentDidMount() {
    this.loadCurrentlyLoggedInUser();
  }

  render() {
    if(this.state.loading) {
      return <LoadingIndicator />
    }

    return (
        <div className="App">
          <div className="app-top-box">
            <AppHeader authenticated={this.state.authenticated} onLogout={this.handleLogout} />
          </div>

        <div className="app-body">
          <Routes>
            <Route exact path="/" element={< Home />}></Route>
            
            <Route path="/login" element={< Login authenticated={this.state.authenticated} />}>
              {/* render={(props) => <Login authenticated={this.state.authenticated} {...props} />}> */}
            </Route>
            
            {/* <Route path="/signup"
              render={(props) => <Signup authenticated={this.state.authenticated} {...props} />}></Route>
            <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>  */}
          </Routes>
        </div>
      </div>
    );
  }
}
export default App;
