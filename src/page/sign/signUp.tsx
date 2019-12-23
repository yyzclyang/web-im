import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Form, Input, Tooltip, Icon, Checkbox, Button, message } from "antd";
import { FormComponentProps } from "antd/es/form";
import {
  classNames,
  safeData,
  scopedClassMaker,
  useShallowEqualSelector
} from "@/utils";
import Sign from "./components/sign";
import { SignUpData } from "@/config/WebIM";
import { signUpAction } from "@/store/action";
import { StoreType } from "@/store";
import "./signUp.scss";

const sc = scopedClassMaker("sign-up");

interface SignUpProps extends FormComponentProps<string> {
  children?: React.ReactElement;
}

const SignUp: React.FC<SignUpProps> = (props: SignUpProps) => {
  const { form } = props;
  const signUpState = useShallowEqualSelector(
    (store: StoreType) => store.sign.signUpState
  );
  const dispatch = useDispatch();
  const [confirmDirty, setConfirmDirty] = useState<boolean>(false);

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        signUpAction((values as unknown) as SignUpData)(dispatch)
          .then()
          .catch((e) => {
            const errorMSGList: { [key: string]: string } = {
              duplicate_unique_property_exists: "用户已存在！",
              illegal_argument: "用户名不合法！",
              unauthorized: "注册失败，无权限！",
              resource_limited: "您的App用户注册数量已达上限,请升级至企业版！"
            };
            const errorMSG = safeData(
              () => errorMSGList[JSON.parse(e.data).error]
            );
            message.error(errorMSG);
          });
      }
    });
  };

  const handleConfirmBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule: any, value: any, callback: any) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule: any, value: any, callback: any) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <Sign>
      <div className={classNames(sc())}>
        <span className={sc("title")}>Welcome to Web IM</span>
        <Form
          {...formItemLayout}
          onSubmit={handleSubmit}
          className={classNames(sc("form"))}
        >
          <Form.Item label="username">
            {form.getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
            {form.getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
            {form.getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            label={
              <span>
                Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {form.getFieldDecorator("nickname", {
              rules: [
                {
                  required: true,
                  message: "Please input your nickname!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            {form.getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className={classNames(sc("form-button"))}
            >
              Register
            </Button>
            Or <Link to="/signIn">sign in now!</Link>
          </Form.Item>
        </Form>
      </div>
    </Sign>
  );
};

export default Form.create({ name: "register" })(SignUp);
