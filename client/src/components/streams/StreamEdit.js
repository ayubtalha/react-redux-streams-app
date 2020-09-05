import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from "./StreamForm";

class StreamEdit extends React.Component {
  componentDidMount() {
    // console.log(this.props.fetchStream());
    // console.log(this.props.editStream);
    // console.log(this.props.match);
    this.props.fetchStream(this.props.match.params.id);
    //id is coming from Field route and then it is matched with fetchStream
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
    //again send the request to the API that something has changed
  };

  render() {
    //props.match coming from componenet={StreamEdit}
    // console.log(this.props);
    if (!this.props.stream) {
      return <div>Loading</div>;
    }
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, "title", "description")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //state has all the info. about the redux store
  //ownProps has all the data from the StreamEdit props whihc was binded by componenet={StreamEdit} in APP.js
  // console.log(ownProps); //has same the data as above console.log(match)
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { fetchStream, editStream })(
  StreamEdit
);
