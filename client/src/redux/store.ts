import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user/reducer';

const middleware = [thunk];

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export type AppState = ReturnType<typeof rootReducer>;
export default store;
