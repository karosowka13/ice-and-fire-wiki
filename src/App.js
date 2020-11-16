import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";
import Layout from "./hoc/Layout/Layout";
import Characters from "./containers/Characters/Characters";

const Books = React.lazy(() => {
	return import("./containers/Books/Books");
});

const Book = React.lazy(() => {
	return import("./containers/Book/Book");
});

const App = () => (
	<div className="App">
		<Layout>
			<Switch>
				<Suspense fallback={<h2>Loading...</h2>}>
					<ErrorBoundary FallbackComponent>
						<Route path="/book/:id" exact component={Book} />
					</ErrorBoundary>
					<ErrorBoundary FallbackComponent>
						<Route path="/books" render={(props) => <Books {...props} />} />
					</ErrorBoundary>
					<Route path="/" exact component={Characters} />
					<Redirect to="/" />
				</Suspense>
			</Switch>
		</Layout>
	</div>
);

export default App;
