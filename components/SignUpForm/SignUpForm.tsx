import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/router";
import { signUp } from "../../apiCalls/user";
import Button from "../Button/Button";
import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";
import { validateSignUp } from "../../dataValidations/signupValidation";
import Message from "../Message/Message";

// TODO: ux validation

const SignUpForm = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);

  //
  const [isButtonLoading, setButtonLoading] = useState(false);

  const signUpUser = async () => {
    const validationMessage = validateSignUp({ name, email, password });
    if (validationMessage) {
      setMessage(validationMessage);
      setError(true);
      return;
    }
    try {
      setButtonLoading(true);

      const response = await signUp({
        name,
        email,
        password,
      });

      //  TODO: fix this
      if (response.status === 201) {
        setError(false);

        setMessage("Sign Up successful! Redirecting...");

        setTimeout(() => {
          router.push("/login");
        }, 1000);
      }
    } catch (err) {
      console.error("Sign Up Error", err);
      setError(true);
      setMessage("Error creating account");
      setButtonLoading(false);
    }
  };

  //   better html structure
  return (
    <div className={styles.main}>
      <div className={styles.form}>
        <h1>Sign Up to Forum</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          isActive={false}
          onClick={signUpUser}
          title="Sign Up"
          isLoading={isButtonLoading}
        />

        <AuthRedirectLink
          text="Already have an account?"
          linkText="Log in"
          href="/login"
        />

        {message && <Message text={message} isError={isError} />}
      </div>
    </div>
  );
};

export default SignUpForm;

// import styles from "./styles.module.css";
// import { useState } from "react";
// import { useRouter } from "next/router";
// import { signUp } from "../../apiCalls/user";
// import Button from "../Button/Button";
// import AuthRedirectLink from "../AuthRedirectLink/AuthRedirectLink";

// // TODO: ux validation

// const SignUpForm = () => {
//   const router = useRouter();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isShowError, setShowError] = useState(false);
//   const [isShowSuccess, setShowSuccess] = useState(false);

//   //
//   const [isButtonLoading, setButtonLoading] = useState(false);

//   const signUpUser = async () => {
//     try {
//       setButtonLoading(true);

//       const response = await signUp({
//         name,
//         email,
//         password,
//       });

//       //  TODO: fix this
//       if (response.status === 201) {
//         setShowSuccess(true);
//         setShowError(false);
//         setTimeout(() => {
//           router.push("/login");
//         }, 1000);
//       }
//     } catch (err) {
//       console.error("Sign Up Error", err);
//       setShowError(true);
//       setButtonLoading(false);
//     }
//   };

//   //   better html structure
//   return (
//     <div className={styles.main}>
//       <h1>Sign Up to Forum</h1>
//       <input
//         type="text"
//         placeholder="Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//       />

//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <Button
//         isActive={false}
//         onClick={signUpUser}
//         title="Sign Up"
//         isLoading={isButtonLoading}
//       />

//       <AuthRedirectLink
//         text="Already have an account?"
//         linkText="Log in"
//         href="/login"
//       />

//       {/* create a  reusable message component */}

//       {isShowError && <h5 className={styles.error}>Error creating account</h5>}
//       {isShowSuccess && (
//         <h5 className={styles.success}>Sign Up successful! Redirecting...</h5>
//       )}
//     </div>
//   );
// };

// export default SignUpForm;
