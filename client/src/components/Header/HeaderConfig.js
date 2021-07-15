import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

const initialState = {
    name: '',
    password: '',
    cf_password: '',
    profileId: '',
    err: '',
    success: ''
}

function HeaderConfig(props) {
    const auth = useSelector(state => state.auth)
    //const token = useSelector(state => state.token)

    const {user, isLogged} = auth
    console.log(auth)
    const [data, setData] = useState(initialState)
    const {name, password,profileId, cf_password, err, success} = data


   

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:5000/users/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/";
        } catch (err) {
            window.location.href = "/";
        }
    }

    const userLink = () => {
        return <li className="drop-nav">
            <Link to="#" className="avatar">
            <img src={user.profilePicture} alt=""/> {user.name} <i className="fas fa-angle-down"></i>
            </Link>
            <ul className="dropdown">
                <li><Link to={`/profile/${user.profileId}`}>Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>Logout</Link></li>
            </ul>
        </li>
    }
    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
        <div className="header-action mt-lg-3 text-right">
            <ul style={transForm}>
                
                {
                    isLogged
                    ? userLink()
                    :<li><Link to="/login"><i className="fas fa-user"></i> Sign in</Link></li>
                }
            </ul>
        </div>
    );
}

export default HeaderConfig;