import './App.css';
import React, {Component} from "react";
import {
  Route,
  Switch
} from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import { getCurrentUser } from '../util/APIUtils';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './App.css';

class App extends Component {
  state = {
    clients: []
  };

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: true,
      clients: []
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
    Alert.success("You're safely logged out!");
  }

  async componentDidMount() {
    const response = await fetch('/api/allfood');
    console.log(response);
    const body = await response.json();
    this.setState({clients: body});
  }

  render() {
    const {clients} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <h1>Health App</h1>
            <div className="App-intro">
              <h2>Food List</h2>
              {clients.map(client =>
                  <div class="rowlist" key={client.name}>
                    {client.name}: {client.kalPerHundredGram} cal/100g
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;
