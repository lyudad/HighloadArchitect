import React, { useEffect } from 'react';
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
    firstName: string,
    lastName: string,
    age: number,
    gender: string,
    interests: string,
    city: string,
    email: string,
    password: string
};

export default function Registration() {
    let history = useHistory();

    const registerUserMutation = useMutation(
        (registrationData: Inputs) => axios.post(`${apiPath}/auth/signup`, registrationData),
    )

    useEffect(() => {
        console.log("registerUserMutation.data", registerUserMutation.data)
        if (registerUserMutation.data?.data.token) {
            localStorage.setItem('token', registerUserMutation.data?.data.token);
            notify();
            setTimeout(() => history.push("/"), 3000);
        }
    }, [registerUserMutation.data?.data?.token])

    const { register, handleSubmit, watch, errors } = useForm<Inputs>();


    const onSubmit = (data: Inputs) => {
        console.log('data,', data)
        registerUserMutation.mutate(data)
    }

    const notify = () => toast("you register success!");

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="firstName">First name</label>
                    <input id="firstName" name="firstName" ref={register({ required: true })} />
                    {errors.firstName && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="firstName">Last name</label>
                    <input id="lastName" name="lastName" ref={register({ required: true })} />
                    {errors.lastName && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="age">Age</label>
                    <input id="age" name="age" type="number" ref={register({ required: true })} />
                    {errors.age && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" ref={register}>
                        <option value="female">female</option>
                        <option value="male">male</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="interests">Interests</label>
                    <input id="interests" name="interests" ref={register({ required: true })} />
                    {errors.interests && <span>This field is required</span>}

                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input id="City" name="city" ref={register({ required: true })} />
                    {errors.city && <span>This field is required</span>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email"  ref={register({ required: true })} />
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