import React from "react";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<React.Fragment>
					<h2>
						The app is facing some problems. Please try one more time and reload
						the page.
					</h2>
				</React.Fragment>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
