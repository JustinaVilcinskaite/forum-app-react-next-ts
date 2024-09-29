import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { login } from "../../apiCalls/user";
import Button from "../Button/Button";
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";

// TODO: ux validation
// TODO: rethink the succes and error

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonLoading, setButtonLoading] = useState(false);

  const [isShowError, setShowError] = useState(false);
  const [isShowSuccess, setShowSuccess] = useState(false);

  const loginUser = async () => {
    try {
      setButtonLoading(true);

      const response = await login({ email, password });

      //  TODO: fix this
      if (response.status === 200) {
        cookie.set(process.env.JWT_KEY as string, response.data.token);

        setShowSuccess(true);
        setShowError(false);
        setTimeout(() => {
          router.push("/");
        }, 1000);

        setButtonLoading(false);
      }
    } catch (err) {
      console.error("Login Error", err);
      setShowError(true);
      setButtonLoading(false);
    }
  };
  //   better html structure
  return (
    <div className={styles.main}>
      <h1>Login to Forum</h1>

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

      {/* create a  reusable message component */}

      {isShowError && <h5 className={styles.error}>Bad email or password</h5>}
      {isShowSuccess && (
        <h5 className={styles.success}>Login successful! Redirecting...</h5>
      )}
    </div>
  );
};

export default LoginForm;
