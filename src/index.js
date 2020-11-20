import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import charactersReducer from "./store/reducers/characters";
import booksReducer from "./store/reducers/books";

const composeEnhancers =
	process.env.NODE_ENV === "development"
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
		  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				trace: true,
				traceLimit: 25,
		  })
		: null || compose;

const rootReducer = combineReducers({
	characters: charactersReducer,
	books: booksReducer,
});

const store = createStore(
	rootReducer,
	composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<Router>
				<App />
			</Router>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);
