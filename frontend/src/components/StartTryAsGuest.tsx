import React, { FormEventHandler } from 'react'
import { useNavigate } from 'react-router';
import { useSignInMutation } from '../features/api/apiSlice';
import { Submit } from './styled/HabbitAddForm'
import { Loading } from './styled/Loading';
import { FormInfo, StartAsGuestFormStyled } from './styled/StartForm'

const StartTryAsGuest = () => {
    const navigate = useNavigate();
    const [signIn, signInResult] = useSignInMutation();
    
    const handleTryAsGuest: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await signIn({ name: 'Guest', password: 'Guest' })
      .unwrap()
      .then((payload) => {
        if (payload.data === "Successfully logged in!") {
          navigate("/app/today");
        }
      }).catch(err=>{})
  }

  return (
    <StartAsGuestFormStyled onSubmit={handleTryAsGuest}>
        <Submit variant='start'>{signInResult.isLoading ? <Loading variant="small"/> : <p>Try as guest</p>}</Submit>
              <div style={{textAlign:"center"}}>
                {signInResult.data && (
          <FormInfo variant="success">{signInResult.data.data}</FormInfo>
        )}

        {signInResult.error && "data" in signInResult.error && (
          <FormInfo variant="warn">
            <>{signInResult.error.data}</>
          </FormInfo>
        )}
        </div>
    </StartAsGuestFormStyled>
  )
}

export default StartTryAsGuest