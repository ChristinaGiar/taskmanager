import { redirect, useNavigate } from 'react-router-dom';

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('token-duration');
  const expirationDate = new Date(storedExpirationDate);
  const currentDate = new Date();
  const duration = expirationDate.getTime() - currentDate.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function tokenLoader({ request }) {
  console.log("request", request);
  const token = getAuthToken();
 
  if (token) {
    let searchParams = new URL(request.url).searchParams;
    // let isLogin = searchParams.get('mode') === 'login';
    if (searchParams.get('mode')) {
      return redirect("/");
    }
  } 
  else {
    // const navigate = useNavigate();
    // navigate('/auth');

    // let history = useHistory();
    // history.push("/home")

    // let searchParams = new URL(request.url).searchParams;
    // if (!searchParams.get('mode')) {
    //   return redirect("/auth");
    // }
  }
  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }
}

export function isLoggedIn() {
  const token = localStorage.getItem('token');

  if (!token) {
    return false;
  }
  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return false;
  }
  return true;
}
