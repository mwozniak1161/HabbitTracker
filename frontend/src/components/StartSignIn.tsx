import { FormEventHandler } from "react";
import { useNavigate } from "react-router";
import { useSignInMutation } from "../features/api/apiSlice";
import { Input, Submit } from "./styled/HabbitAddForm";
import { Loading } from "./styled/Loading";
import { FormInfo, StartFormStyled } from "./styled/StartForm";


export const StartLoginForm = () => {
    const navigate = useNavigate();
    const [signIn, signInResult] = useSignInMutation();
    
    const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      signInName: { value: string };
      signInPass: { value: string };
    };
    const signInName = target.signInName.value;
    const signInPass = target.signInPass.value;
    await signIn({ name: signInName, password: signInPass })
      .unwrap()
      .then((payload) => {
        if (payload.data === "Successfully logged in!") {
          navigate("/app/today");
        }
      })
  }
  
  return (
    <StartFormStyled onSubmit={handleSignIn} >
      <h2>Sign In</h2>
        <label htmlFor="signInName"><b>Name:</b></label>
        <Input
          type="text"
          name="signInName"
          id="signInName"
          autoComplete="username"
          required
        />
        <label htmlFor="signInPass"><b>Password:</b></label>
        <Input
          type="password"
          name="signInPass"
          id="signInPass"
          autoComplete="current-password"
          required
        />
        <Submit variant='start'>{signInResult.isLoading ? <Loading variant="small"/> : <p>Sign Up </p>}</Submit>
      <div>
        {signInResult.data && (
          <FormInfo variant="success">{signInResult.data.data}</FormInfo>
        )}

        {signInResult.error && "data" in signInResult.error && (
          <FormInfo variant="warn">
            <>{signInResult.error.data}</>
          </FormInfo>
        )}
        </div>
    </StartFormStyled>
  )
};