import React, {useEffect} from "react";
import {Switch, Route} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import Header from "./components/nav/Header";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import UserRoute from "./components/routes/UserRoute";
import WishList from "./pages/user/WishList";
import Password from "./pages/user/Password";

import {auth} from "./firebase";
import {useDispatch} from "react-redux";
import {currentUser} from "./functions/auth";
import History from "./pages/user/History";

const App = () => {
    const dispatch = useDispatch();

    // to check firebase auth state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const idTokenResult = await user.getIdTokenResult();
                currentUser(idTokenResult.token)
                    .then(({data}) => {
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                email: data.email,
                                name: data.name,
                                role: data.role,
                                _id: data._id,
                                token: idTokenResult.token,
                            },
                        })
                    })
                    .catch(err => console.log(err))
                console.log("user", user);
            }
        });
        // cleanup
        return () => unsubscribe();
    }, []);

    return (
        <>
            <Header/>
            <ToastContainer/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/register/complete" component={RegisterComplete}/>
                <Route exact path="/forgot/password" component={ForgotPassword}/>
                <UserRoute exact path='/user/history' component={History}/>
                <UserRoute exact path='/user/password' component={Password}/>
                <UserRoute exact path='/user/wishlist' component={WishList}/>

            </Switch>
        </>
    );
};

export default App;
