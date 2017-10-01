import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="main">
        <h1>lmao</h1>
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
