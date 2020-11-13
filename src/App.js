import React from "react";
import Layout from "./hoc/Layout/Layout";
import Characters from "./containers/Characters/Characters";
import "./App.css";

const App = () => (
	<div className="App">
		<Layout>
			<Characters />
		</Layout>
	</div>
);

export default App;
