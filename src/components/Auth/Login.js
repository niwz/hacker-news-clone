import React, { useState } from 'react';
import useFormValidation from './useFormValidation';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '' 
}

function Login(props) {
  const { handleSubmit, handleBlur, handleChange, values, errors, isSubmitting } = useFormValidation(INITIAL_STATE)
  const [login, setLogin] = useState(true)

  return (
    <div>
      <h2 className="mv3">
        {login ? "Login" : "Create Account"}
      </h2>
      <form onSubmit={ (event) => handleSubmit(event) } className="flex flex-column">
        {!login && <input 
          type="text"
          name="name"
          value={values.name}
          onChange={(event) => handleChange(event)}
          placeholder="Your name"
          autoComplete="off"
        />}
        <input 
          type="email"
          name="email"
          onBlur={ () => handleBlur() }
          className={errors.email && 'error-input'}
          value={values.email}
          onChange={ (event) => handleChange(event) }
          placeholder="Your email"
          autoComplete="off"
        />
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input 
          type="password"
          name="password"
          onBlur={ () => handleBlur() }
          className={errors.password && 'error-input'}
          value={values.password}
          onChange={(event) => handleChange(event)}
          placeholder="Choose a secure password"
        />
        {errors.password && <p className="error-text">{errors.password}</p>}
        <div className="flex mt3">
          <button 
            type="submit" 
            disabled={isSubmitting}
            style={{ background: isSubmitting ? "grey" : "orange" }}
            className="button pointer mr2">
            Submit
          </button>
          <button
            type="button"
            className="button pointer mr2"
            onClick={() => setLogin(prevLogin => !prevLogin)}>
            {login ? "Need to register?" : "Already have an account?"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
