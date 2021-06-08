import {combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history)
});

export default (state, action) => {
    let newState = state;
  
    return rootReducer(newState, action);
};
  