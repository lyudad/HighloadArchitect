import React, {useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    useMutation
  } from "react-query";

import { apiPath } from 'Consts/api';

type Inputs = {
    email: string,
    password: string,
};
interface LoginProps{
    updateAuth: (updatedValue: boolean) => void
}

const Login: React.FunctionComponent<LoginProps> = ({updateAuth}) => {
    let history = useHistory();
    const loginUserMutation = useMutation((registrationData: Inputs) => axios.post(`${apiPath}/auth/login`, registrationData))

    useEffect(() => {
        if(loginUserMutation.data?.data.token){
            console.log("loginUserMutation.data?.data.token", loginUserMutation.data?.data.token)
            localStorage.setItem('token', loginUserMutation.data?.data.token);
            notify();
            updateAuth(true)
            setTimeout(() => history.push("/"), 3000);
        }
    }, [loginUserMutation.data?.data?.token])

    useEffect(() => {
        if(loginUserMutation.data?.data.error){
            console.log("loginUserMutation.data?.data.token", loginUserMutation.data?.data.error)
            notifyError();
        }
    }, [loginUserMutation.data?.data?.error])

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    
    const onSubmit = (data: Inputs) => {
        console.log('data,', data)
        loginUserMutation.mutate(data)
    }

    const notify = () => toast("you login success!");

    const notifyError = () => toast("login or password is wrong!");

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" ref={register({ required: true })}/>
                    {errors.email && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" ref={register({ required: true })} />
                    {errors.password && <span>This field is required</span>}
                </div>

                <input type="submit" />
            </form>
        </>
    );
}

export default Login