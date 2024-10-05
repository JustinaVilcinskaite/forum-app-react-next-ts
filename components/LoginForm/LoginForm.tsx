import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { login } from "../../apiCalls/user";
import Button from "../Button/Button";
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import { validateLogin } from "../../dataValidations/loginValidation";
import Message from "../Message/Message";

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);

  const loginUser = async () => {
    const validationMessage = validateLogin({ email, password });
    if (validationMessage) {
      setMessage(validationMessage);
      setError(true);
      return;
    }

    try {
      setButtonLoading(true);

      const response = await login({ email, password });

      if (response.status === 200) {
        cookie.set(process.env.JWT_KEY as string, response.data.token);
        setError(false);
        setMessage("Login successful! Redirecting...");

        setTimeout(() => {
          router.push("/questions");
        }, 1000);

        setButtonLoading(false);
      }
    } catch (err) {
      console.error("Login Error", err);
      setError(true);
      setMessage("Bad email or password");
      setButtonLoading(false);
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Log in to Forum</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        <Button onClick={loginUser} title="Login" isLoading={isButtonLoading} />

        <AuthRedirectLink
          text="Do not have an account yet?"
          linkText="Create an account"
          href="/signup"
        />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default LoginForm;
