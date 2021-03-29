import auth from './firebase';
import { v4 as uuid } from 'uuid';
import { Button } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  Route,
  useParams,
} from 'react-router-dom';
import { useEffect } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
// import { useCollectionData } from 'react-firebase-hooks/firestore';
const firestore = firebase.firestore();

function useQuery() {
  return useLocation()
    ?.search?.replace(/^\?/, '')
    ?.split('&')
    ?.reduce((query, param) => {
      const keyValuePair = param?.split('=');
      query[keyValuePair[0]] = keyValuePair[1];
      return query;
    }, {});
}

const SignOut = () => {
  const query = useQuery();
  console.log(query);
  return (
    auth.currentUser && (
      <>
        <Button
          className='sign-out'
          onClick={() => {
            auth.signOut();
          }}>
          Sign Out
        </Button>
      </>
    )
  );
};

const storeToken = async () => {
  const token = await auth.currentUser.getIdToken();
  console.log(token);
  console.log(typeof token);
  return firestore
    .collection('oAuthTokens')
    .add({
      token,
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

const OAuthAuthorize = () => {
  const query = useQuery();
  useEffect(() => {
    if (
      //validate client ID, redirect_uri against firestore
      query.client_id !== '123456' ||
      query.redirect_uri !== 'https%3A%2F%2Ftracer482.com'
    ) {
      const urlErrMsg = encodeURIComponent(
        'client_id and redirect_uri must match the expected values!'
      );
      window.location.replace(
        `https://localhost:3000/error?message=${urlErrMsg}`
      );
      return;
    }
    //generate and record a one time use code
    const code = uuid(); //don't use this use the firebase id code instaed
    //store in firebase

    storeToken().then(() => {
      //recirect back to callback url and include client code

      const url = encodeURI(
        `${decodeURI(query.redirect_uri)}?code=${code}&state=${query.state}`
        // this isn't currently working..
        //I thing the URI encode/decode needs to be better understood and implemented
      );
      window.location.replace(url);
    });
  });
  return <h1>Redirecting</h1>;
};

const LoggedIn = () => {
  return (
    <div className='LoggedIn'>
      <h1>LoggedIn</h1>
      <Router>
        <SignOut />

        <Switch>
          <Route path='/login/oauth/authorize'>
            <OAuthAuthorize />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default LoggedIn;
