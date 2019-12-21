import React from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
import { FormComponentProps } from "antd/es/form";
import { classNames, scopedClassMaker } from "@/utils";
import Sign from "./components/sign";
import "./signIn.scss";

const sc = scopedClassMaker("sign-in");

interface SignInProps extends FormComponentProps<string> {
  children?: React.ReactElement;
}

const SignIn: React.FC<SignInProps> = (props: SignInProps) => {
  const {
    form: { validateFields, getFieldDecorator }
  } = props;

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <Sign>
      <div className={classNames(sc())}>
        <span className={sc("title")}>Web IM</span>
        <Form onSubmit={handleSubmit} className={classNames(sc("form"))}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={classNames(sc("form-button"))}
            >
              Log in
            </Button>
            Or <Link to="/signUp">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    </Sign>
  );
};

export default Form.create<SignInProps>({ name: "normal_login" })(SignIn);
