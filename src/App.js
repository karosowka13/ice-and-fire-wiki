import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Characters from "./containers/Characters/Characters";
import Books from "./containers/Books/Books";
import Book from "./containers/Book/Book";

const App = () => (
	<div className="App">
		<Layout>
			<Switch>
				<Route path="/book/:id" exact component={Book} />
				<Route path="/books" exact component={Books} />
				<Route path="/" exact component={Characters} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	</div>
);

export default App;
