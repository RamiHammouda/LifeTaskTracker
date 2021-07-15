import React from 'react'
import {Switch,Route} from 'react-router-dom'
import Login from  './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from './auth/ForgotPassword'
import ResetPass from './auth/ResetPassword'

import Profile from './profile/Profile'
import EditUser from './profile/EditUser'

import Home from '../Home.js'

import {useSelector} from 'react-redux'
import UpdateProfile from "../Profile/updateProfile";
import DiplomasList from "../Profile/DiplomasList";
import JobsList from "../Profile/JobsList";
import ProjectsList from "../Profile/ProjectsList";
import Error404 from "../../pages/Error404";

function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin,user} = auth
    return (
        <section>
            <Switch>
                <Route path="/" component={Home} exact />
                
                <Route path="/login" component={isLogged ? Error404 : Login} exact/>
                <Route path="/register" component={isLogged ? Error404 : Register} exact />

                <Route path="/forgot_password" component={isLogged ? Error404 : ForgotPass} exact />
                <Route path="/users/reset/:token" component={isLogged ? Error404 : ResetPass} exact />

                <Route path="/users/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : Error404} exact />


                <Route path="/profile/:profileUrl" exact component={isLogged ? Error404 : Profile}/>
                  
                  <Route path="/profile/:profileUrl/update" exact>
                    <UpdateProfile user={user} />
                  </Route>

                  
                  <Route path="/profile/:profileUrl/diplomas" exact component={isLogged ? Error404 : DiplomasList }/>

                  <Route path="/profile/:profileUrl/projects" exact>
                    <ProjectsList user={user}/>
                  </Route>

                  <Route path="/profile/:profileUrl/jobs" exact>
                    <JobsList user={user}/>
                  </Route>

                {/* <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact /> */}

            </Switch>
        </section>
    )
}


export default Body
