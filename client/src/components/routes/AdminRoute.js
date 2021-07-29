import React, {useEffect, useState} from "react";
import {Route} from "react-router-dom";
import {useSelector} from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import {currentAdmin} from "../../functions/auth";

const AdminRoute = ({children, ...rest}) => {

    const [ok, setOk] = useState(false)
    const {user} = useSelector((state) => ({...state}));

    useEffect(()=> {
        if(user && user.token){
            currentAdmin(user.token)
                .then((res)=>{
                    // console.log('CURRENT ADMIN RES:', res)
                    setOk(true)
                })
                .catch((err)=> {
                    setOk(false)
                    console.log('ADMIN ROUTE ERROR: ', err)
                })
        }
    }, [user])

    return ok  ? (
        <Route {...rest} />
    ) : (
        <LoadingToRedirect/>
    );
};

export default AdminRoute;
