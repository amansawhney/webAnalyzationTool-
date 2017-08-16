import React, { Component } from 'react';
import axios from 'axios';
const mergeJSON = require('merge-json');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      data: {},
    };
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.postAPI = this.postAPI.bind(this);
  }
  postAPI(e) {
    e.preventDefault();
    var self = this;
    var routes = [
      'ada',
      'psi',
      'links',
      'tags',
      'ssl',
      'wpVersion',
      'drupalVersion',
    ];
    routes.map(route => {
      axios
        .post('/api/' + route, {
          url: self.state.url,
        })
        .then(function(response) {
          console.log(response.data);
          self.setState({
            data: mergeJSON.merge(self.state.data, {
              data: { [route]: response.data },
            }),
          });
        })
        .catch(function(error) {
          console.log(error);
        });
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
        <pre>
          <code>
            {JSON.stringify(this.state.data, null, 2)}
          </code>
        </pre>
      </div>
    );
  }
}

export default App;
