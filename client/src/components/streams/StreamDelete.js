import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Modal from "../streams/Modal";
import history from "../../reducers/history";
import { fetchStream, deleteStream } from "../../actions";

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }

  renderActions() {
    // const id = this.props.match.params.id;
    //same as above statement
    const { id } = this.props.match.params;

    return (
      <React.Fragment>
        {/* returns the multiple JSX elements (Delete Button and Cancel Button) from single variable (const actions) */}
        <button
          onClick={() => this.props.deleteStream(id)}
          className="ui red button"
        >
          Delete
        </button>
        <Link to="/" className="ui button">
          Cancel
        </Link>
      </React.Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`;
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        // title={this.renderContent()}
        content={this.renderContent()}
        actions={this.renderActions()}
        onDimiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(
  StreamDelete
);
