import React ,{useContext}from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';



const Index = ({child}) => {
  return (
    <section>

<GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
<GoogleLogin
  onSuccess={credentialResponse => {
    const details=jwtDecode(credentialResponse.credential);
    // console.log(details);
    child(details);
    
  }}
  onError={() => {
    console.log('Login Failed');
  }}
prompt='none'
  children="Sign in with Google"/>;
    
    </GoogleOAuthProvider>;



    </section>
  )
}

export default Index
