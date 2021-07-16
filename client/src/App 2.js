import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Body from './components/body/Body';
import Header from './components/Header';
import HeaderAdmin from './components/HeaderAdmin';
import { dispatchGetUser, dispatchLogin, fetchUser } from './redux/actions/authAction';






function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)


  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])
  
  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])


  const {isAdmin} = auth

  return (
    <Router>
      <div className="App">
        {isAdmin?<HeaderAdmin />:<Header />}
        <Body />
      </div>
    </Router>
  );
}

export default App;
