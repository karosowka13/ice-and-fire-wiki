import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Characters from "./containers/Characters/Characters";
import Books from "./containers/Books/Books";
const App = () => (
	<div className="App">
		<Layout>
			<Switch>
				<Route path="/books" exact component={Books} />
				<Route path="/" exact component={Characters} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	</div>
);

export default App;
