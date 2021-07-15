import React, { useEffect } from "react";
import { BrowserRouter as Route, Switch } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'


import Body from "./components/body/Body"

import "./App.css";

import axios from 'axios';
import Header from './components/Header'
import Footer from "./components/Footer";

function App()  {

  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('http://localhost:5000/users/refresh_token', null)
        console.log(res)
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

    return (
      <div>
        <Header/>
        <Body/>
        <Footer/>
      </div>
  )

}

export default App;
