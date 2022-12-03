import React, { useEffect, useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { LoginParam, UserService } from '../../Services/UserService';
import { Col, Form, Row, Button, Spinner, ToastContainer, Toast } from 'react-bootstrap';
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Auth } from '../../Core/Services/AuthService';
import './Login.scss';
import { useLocation, useNavigate } from 'react-router-dom';

function Login() {
  const EMAIL_REGEX: any = process.env.REACT_APP_EMAIL_REGEX || '';
  const userService = new UserService();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from: any })?.from?.pathname || "/dashboard";
  const onPasswordVisiblity = () => {
    setShowPassword(!showPassword);
  };


  const getInitialValues = () => {
    return {
      email: '',
      password: '',
    };
  };


  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    const payload: LoginParam = {
      email: values.email,
      password: values.password,
    };
    await userService.login(payload)
      .then((res) => {
        Auth.setUser(res).then(() => {
          navigate(from, { replace: true });
        }).catch(() => { });
      })
      .catch((e) => {
        console.log('e', e)
      });
  };

  const formlik = {
    validationSchema: yup.object().shape({
      email: yup.string()
        .required('Please enter email')
        .matches(EMAIL_REGEX, 'Please provide a valid email'),
      password: yup.string()
        .required('Please enter password')
        .min(5, 'Password must contains at least five characters')
    }),
    initialValues: getInitialValues(),
    onSubmit: onSubmit
  };

  return (
    <div className='login-container'>
      <Row className='shadow p-3 mb-5 bg-white rounded login-box'>
        <Col className='login'>
          <Formik {...formlik}>
            {({ handleSubmit, handleChange, touched, values, isSubmitting, errors }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Enter email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Your email"
                    onChange={handleChange}
                    value={values.email}
                    isValid={touched.email && !errors.email}
                    autoComplete="off"
                    isInvalid={!!errors.email} />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <div className="password-field">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Your Password"
                      onChange={handleChange}
                      value={values.password}
                      isValid={touched.password && !errors.password}
                      isInvalid={!!errors.password} />
                    <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    <span className="toggler" onClick={onPasswordVisiblity}>
                      {
                        showPassword ? <BsEyeSlash className="close" /> : <BsEye className="open" />
                      }
                    </span>
                  </div>
                </Form.Group>

                <Button variant="success" type="submit" disabled={isSubmitting} className="login-button">
                  Login to Continue
                  {(isSubmitting) ? <Spinner className="spinner" animation="border" size="sm" /> : null}
                </Button>

              </Form>

            )}
          </Formik>
        </Col>
     
      </Row>

    </div>
  )
}

export default Login
