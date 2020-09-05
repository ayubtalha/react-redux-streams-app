import React from "react";
import { connect } from "react-redux";
import { createStream } from "../../actions"; //coming from action creator (streamCreator --->streams--->index.js)
import StreamForm from "./StreamForm";

class StreamCreate extends React.Component {
  onSubmit = (formValues) => {
    //formValues are coming from <Field/>
    // console.log(formValues);
    this.props.createStream(formValues); //sending to action creator and axios to get a request
  };

  render() {
    // console.log(this.props);
    return (
      <div>
        <h3>Create a Stream</h3>
        <StreamForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(null, { createStream })(StreamCreate);
