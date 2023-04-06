import { Component } from 'react';

class ErrorBoundary extends Component {
	constructor() {
		super();
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		console.log(error);
		return { hasError: true };
	}

	// by adding 'componentDidCatch' lifecycle method makes the component
	// an error boundary which can be used as a wrapper.
	componentDidCatch(error) {
		console.log(error);
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return <p>Something went wrong!</p>;
		}
		return <p>{this.props.children}</p>;
	}
}

export default ErrorBoundary;