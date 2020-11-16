import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";
import Layout from "./hoc/Layout/Layout";
import Characters from "./containers/Characters/Characters";
import Books from "./containers/Books/Books";
import Book from "./containers/Book/Book";

const App = () => (
	<div className="App">
		<Layout>
			<Switch>
				<Route
					path="/books"
					render={(props) => (
						<React.Fragment>
							<ErrorBoundary FallbackComponent>
								<Books {...props} />
							</ErrorBoundary>
						</React.Fragment>
					)}
				/>
				<Route
					exact
					path="/book/:id"
					render={(props) => (
						<React.Fragment>
							<ErrorBoundary FallbackComponent>
								<Book {...props} />
							</ErrorBoundary>
						</React.Fragment>
					)}
				/>
				<Route exact path="/" component={Characters} />
				<Redirect to="/" />
			</Switch>
		</Layout>
	</div>
);

export default App;
