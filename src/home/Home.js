import React, { Component } from 'react';
import './Home.css';

class Home extends Component {
    state = {
      clients: []
    };

    async componentDidMount() {
        const response = await fetch('/api/allfood', { mode: 'no-cors'});
        console.log(response);
        const body = await response.json();
        this.setState({clients: body});
      }

    render() {
        const {clients} = this.state;

        return (
            <div className="home-container">
                <div className="container">
                    <div className="graf-bg-container">
                        <div className="graf-layout">
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                            <div className="graf-circle"></div>
                        </div>
                    </div>
                    <h1 className="home-title">Spring Boot React OAuth2 Social Login Demo</h1>
                    <div className="App-intro">
                        <h2>Food List</h2>
                        {clients.map(client =>
                            <div class="rowlist" key={client.name}>
                                {client.name}: {client.kalPerHundredGram} cal/100g
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;