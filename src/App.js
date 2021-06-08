import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter,Router } from "react-router-dom";
import { ConnectedRouter } from 'connected-react-router';
import store from './configureStore';
import {history} from './rootReducer'
import MainRoutes from './router';
import MainContainer from './container'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store = {store}>
        <Router history={history}> 
          <MainContainer>
            <MainRoutes />
          </MainContainer>
        </Router>
      </Provider>
    );
  }
}

export default App;