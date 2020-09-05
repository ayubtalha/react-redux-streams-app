import React from "react";
import { Field, reduxForm } from "redux-form";

class StreamForm extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    // console.log(input); // Field sending arguments to this.renderInput so consoling to check what are we recieving
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {/* <input {...input} --->means --->onChange={formProps.input.onChange} // same as above ---> value={formProps.input.value} */}
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    //formValues are coming from <Field/>
    // console.log(formValues);
    this.props.onSubmit(formValues); //sending to action creator and axios to get a request
  };

  render() {
    // console.log(this.props);
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  //formValues send to reduxForm({validate}) ---> then to Field ({render.input}) ----> further diplay to meta ---> meta responsible for errors
  const errors = {};

  if (!formValues.title) {
    errors.title = "You must enter a title";
  }

  if (!formValues.description) {
    errors.description = "You must enter a description";

    return errors;
  }
};

export default reduxForm({
  form: "streamForm",
  validate,
})(StreamForm);
