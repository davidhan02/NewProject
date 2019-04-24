import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import FormField from '../common/FormField';
import { submitRegister, clearErrors } from '../../actions/authActions';

const registerFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password' },
  { label: 'Confirm Password', name: 'password2' }
];

class Register extends Component {
  componentWillUnmount() {
    this.props.clearErrors();
  }

  renderFields() {
    const { errors } = this.props.auth;
    return registerFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          type={name}
          name={name}
          label={label}
          errors={errors}
          placeholder={label}
          component={FormField}
        />
      );
    });
  }

  onSubmit = formValues => {
    const { submitRegister, history } = this.props;
    submitRegister(formValues, history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="register">
        <h3>Register</h3>
        <Form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <Button variant="primary" size="lg" type="submit" block>
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  submitRegister: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const validate = formValues => {
  const errors = {};

  registerFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  const { password, password2 } = formValues;
  if (password !== password2) {
    errors.password2 = 'Passwords do not match';
  }

  return errors;
};

const formWrap = reduxForm({
  validate,
  form: 'registerForm'
})(Register);

export default connect(
  mapStateToProps,
  { submitRegister, clearErrors }
)(formWrap);
