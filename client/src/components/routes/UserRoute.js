import React from "react";
import {Route, Link, Redirect} from 'react-router-dom'
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({children, ...rest}) => {

    const {user} = useSelector((state) => ({...state}));

    return (
        user && user.token ? (
            <Route {...rest} render={()=> children}/>
        ): <h3 className={'text-warning'}><LoadingToRedirect/></h3>
    )
}

export default UserRoute;