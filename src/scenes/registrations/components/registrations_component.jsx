import React, { Component } from "react";
import { Page, PageContent } from "./../../../shared_components/layout/Page";
import TopBar from "./../../../shared_components/TopBar";
import BrandFooter from "./../../../shared_components/BrandFooter";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from "semantic-ui-react";
import { Logo } from "./../../../shared_components/icons";
import { Link } from "react-router-dom";

const RegistrationsComponent = props => {
  return (
    <section>
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" color="teal" textAlign="center">
              <Logo />
              Register
            </Header>
            {Object.keys(props.errors).length !== 0 && (
              <Message style={{ color: "red" }}>
                {props.errors.error.message}
              </Message>
            )}
            {Object.keys(props.stateErrors).length !== 0 && (
              <Message style={{ color: "red" }}>
                {props.stateErrors.message}
              </Message>
            )}
            <Form size="large">
              <Segment stacked>
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  type="text"
                  name="username"
                  id="username"
                  onChange={props.handleInputChange}
                  autoFocus
                  required
                />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  type="email"
                  name="email"
                  id="email"
                  onChange={props.handleInputChange}
                  onBlur={props.validateInput}
                  error={props.isInputInvalid("email")}
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  name="password"
                  id="password"
                  onChange={props.handleInputChange}
                  onBlur={props.validateInput}
                  error={props.isInputInvalid("password")}
                  minLength={8}
                  required
                />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password confirmation"
                  type="password"
                  name="password_confirmation"
                  id="password_confirmation"
                  onChange={props.handleInputChange}
                  onBlur={props.validateInput}
                  error={props.isInputInvalid("password")}
                  minLength={8}
                  required
                />

                <Button
                  color="teal"
                  fluid
                  size="large"
                  onClick={props.onSubmitRegistration}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an account ? <Link to="/login">Sign In</Link>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    </section>
  );
};

export default RegistrationsComponent;