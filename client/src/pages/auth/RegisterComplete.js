import React, {useState, useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import {createOrUpdateUser} from "../../functions/auth";

const RegisterComplete = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let dispatch = useDispatch()
    const {user} = useSelector((state) => ({...state}));

    const roleBasedRedirect = (role) => {
        if (role === 'admin') {
            history.push('/admin/dashboard')
        } else {
            history.push('/user/history')
        }
    }


    useEffect(() => {
        setEmail(window.localStorage.getItem("emailForRegistration"));
        // console.log(window.location.href);
        // console.log(window.localStorage.getItem("emailForRegistration"));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
            toast.error("Email and password is required");
            return;
        }

        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }

        try {
            const result = await auth.signInWithEmailLink(
                email,
                window.location.href
            );
            if (result.user.emailVerified) {
                // remove user email fom local storage
                window.localStorage.removeItem("emailForRegistration");
                // get user id token
                let user = auth.currentUser;
                await user.updatePassword(password);
                const idTokenResult = await user.getIdTokenResult();

                createOrUpdateUser(idTokenResult.token)
                    .then(({data}) => {
                        console.log('DATA: ', data)
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                email: data.email,
                                name: data.name,
                                role: data.role,
                                _id: data._id,
                                token: idTokenResult.token,
                            },
                        });

                        roleBasedRedirect(data.role)

                    })
                    .catch(err => {
                        console.error(err)
                        toast.error(err.message)
                    });
                // history.push("/");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input type="email" className="form-control" value={email} disabled/>

            <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoFocus
            />
            <br/>
            <button type="submit" className="btn btn-raised">
                Complete Registration
            </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Register Complete</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
