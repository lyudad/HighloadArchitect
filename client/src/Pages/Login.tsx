import React, {useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
    useMutation
  } from "react-query";

type Inputs = {
    email: string,
    password: string,
};

export default function Login() {
    let history = useHistory();
    const loginUserMutation = useMutation((registrationData: Inputs) => axios.post('http://ec2-52-59-247-125.eu-central-1.compute.amazonaws.com:8000/auth/login', registrationData))

    useEffect(() => {
        if(loginUserMutation.data?.data.token){
            console.log("loginUserMutation.data?.data.token", loginUserMutation.data?.data.token)
            localStorage.setItem('token', loginUserMutation.data?.data.token);
            setTimeout(() => history.push("/"), 1000);
        }
    }, [loginUserMutation.data?.data?.token])

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    
    const onSubmit = (data: Inputs) => {
        console.log('data,', data)
        loginUserMutation.mutate(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" name="email" ref={register({ required: true })}/>
                {errors.email && <span>This field is required</span>}
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input id="password" name="password" type="password" ref={register({ required: true })} />
                {errors.password && <span>This field is required</span>}
            </div>

            <input type="submit" />
        </form>
    );
}