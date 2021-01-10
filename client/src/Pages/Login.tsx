import React, {useEffect} from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";

import {
    useMutation
  } from "react-query";

type Inputs = {
    email: string,
    password: string,
};

export default function Login() {
    const loginUserMutation = useMutation((registrationData: Inputs) => axios.post('http://127.0.0.1:8000/auth/login', registrationData))
console.log("loginUserMutation>", loginUserMutation)
    useEffect(() => {
        console.log("loginUserMutation.data?.data.token", loginUserMutation.data?.data.token)
        localStorage.setItem('token', loginUserMutation.data?.data.token);
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