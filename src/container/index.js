import React from 'react';
import { BrowserRouter, withRouter } from "react-router-dom";

class MainContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('history', this.props.history)
    return (
        <React.Fragment>
            <div className="app-main">
              <div className="app-content">
                {this.props.children}
              </div>
            </div>
        </React.Fragment>
    );
  }
}

export default withRouter(MainContainer);