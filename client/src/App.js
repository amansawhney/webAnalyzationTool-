import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      data: {
        psi: {},
      },
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.postAPI = this.postAPI.bind(this);
  }
  postAPI(e) {
    e.preventDefault();
    var self = this;
    axios
      .post('/api/psi', {
        url: self.state.url,
      })
      .then(function(response) {
        console.log(response.data);
        self.setState({ data: { psi: response.data } });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  handleUrlChange(event) {
    this.setState({ url: event.target.value });
  }

  render() {
    return (
      <div className="App">
        <input
          type="text"
          value={this.state.url}
          onChange={this.handleUrlChange}
        />
        <button onClick={this.postAPI}>postAPI</button>
        <p>
          {JSON.stringify(this.state.data.psi, null, 2)}
        </p>
      </div>
    );
  }
}

export default App;
