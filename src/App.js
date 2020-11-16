import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ErrorBoundary from "./hoc/ErrorBoundary/ErrorBoundary";
import Layout from "./hoc/Layout/Layout";
import Characters from "./containers/Characters/Characters";
import Spinner from "./components/UI/Spinner/Spinner";

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
				<React.Suspense fallback={<Spinner />}>
					<Route
						path="/books"
						render={(props) => (
							<React.Fragment>
								<ErrorBoundary FallbackComponent>
									<Books {...props} />
								</ErrorBoundary>
							</React.Fragment>
						)}
					/>{" "}
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
				</React.Suspense>
			</Switch>
		</Layout>
	</div>
);

export default App;
