import React from "react";
import { Alert, Button } from "reactstrap";
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, resetCount: null };
  }
  reRender = () => {
    // calling the forceUpdate() method
    this.forceUpdate();
  };
  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
    //console.log(errorInfo, error);
  }

  render() {
    if (this.state.errorInfo) {
      // Error path

      return (
        <div>
          <Alert color="danger">
            <h4 className="alert-heading">Something went wrong.</h4>
            <details style={{ whiteSpace: "pre-wrap" }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
            <hr />
            <Button className="mb-0" type="button" onClick={this.reRender}>
              Reset
            </Button>
          </Alert>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
export default ErrorBoundary;
