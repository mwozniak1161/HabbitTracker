import { FormEventHandler } from "react";
import { useSignUpMutation } from "../features/api/apiSlice";
import { Input, Submit } from "./styled/HabbitAddForm";
import { Loading } from "./styled/Loading";
import { FormInfo, StartFormStyled } from "./styled/StartForm";

export const StartRegisterForm = () => {
  const [signUp, signUpResult] = useSignUpMutation();

  const handleSignUp: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      signUpName: { value: string };
      signUpPass: { value: string };
    };
    const signUpName = target.signUpName.value;
    const signUpPass = target.signUpPass.value;
    await signUp({ name: signUpName, password: signUpPass })
      .unwrap()
      .then((payload) => {})
      .catch((error) => {});
  };

  return (
    <StartFormStyled onSubmit={handleSignUp}>
      <h2>SignUp</h2>
      <label htmlFor="signUpName">
        <b>Name:</b>
      </label>
      <Input
        type="text"
        name="signUpName"
        id="signUpName"
        autoComplete="username"
        required
      />
      <label htmlFor="signUpPass">
        <b>Password:</b>
      </label>
      <Input
        type="password"
        name="signUpPass"
        id="signUpPass"
        autoComplete="current-password"
        required
        minLength={8}
      />
      <Submit variant="start">
        {signUpResult.isLoading ? <Loading variant="small" /> : <p>Sign Up </p>}
      </Submit>
      <div>
        {signUpResult.data && (
          <FormInfo variant="success">{signUpResult.data.data}</FormInfo>
        )}

        {signUpResult.error && "data" in signUpResult.error && (
          <FormInfo variant="warn">
            <>{signUpResult.error.data}</>
          </FormInfo>
        )}
      </div>
    </StartFormStyled>
  );
};
