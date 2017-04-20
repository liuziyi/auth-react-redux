import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {

	onFormSubmit(formProps){
		this.props.signupUser(formProps);
	}

	renderAlert(){
		if(this.props.errorMessage){
			return(
				<div className="alert alert-danger">
					<strong>Opps!</strong> {this.props.errorMessage}
				</div>
			)
		}
	}

	render(){

		const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

		return(
			<form onSubmit={handleSubmit(this.onFormSubmit.bind(this))}>
				<fieldset className={`form-group ${email.touched && email.invalid ? 'has-danger' : ''}`}>
					<label>Email: </label>
					<input className="form-control" {...email} />
					<div className="text-help">
						{email.touched && email.error ? email.error : ''}
					</div>
				</fieldset>
				<fieldset className={`form-group ${password.touched && password.invalid ? 'has-danger' : ''}`}>
					<label>Password: </label>
					<input className="form-control" type="password" {...password} />
					<div className="text-help">
						{password.touched && password.error ? password.error : ''}
					</div>
				</fieldset>
				<fieldset className={`form-group ${passwordConfirm.touched && passwordConfirm.invalid ? 'has-danger' : ''}`}>
					<label>Confirm Password: </label>
					<input className="form-control" type="password" {...passwordConfirm} />
					<div className="text-help">
						{passwordConfirm.touched && passwordConfirm.error ? passwordConfirm.error : ''}
					</div>
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Sign Up</button>
			</form>
		)
	}
}

function validate(formProps){
	// console.log(formProps)
	const errors = {};

	if(!formProps.email){
		errors.email = 'Email cannot be empty';
	}

	if(!formProps.password){
		errors.password = 'Password cannot be empty';
	}

	if(!formProps.passwordConfirm){
		errors.passwordConfirm = 'Confirm password cannot be empty';
	}

	if(formProps.password !== formProps.passwordConfirm){
		errors.passwordConfirm = 'Password must match';
	}

	return errors;
}

function mapStateToProps(state){
	return { errorMessage: state.auth.error }
}

export default reduxForm({
	form: 'signup',
	fields: [ 'email' , 'password' , 'passwordConfirm' ],
	validate
}, mapStateToProps, actions)(Signup);