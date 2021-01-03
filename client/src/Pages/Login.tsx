import React from 'react';
import { useForm } from "react-hook-form";

type Inputs = {
    email: string,
    password: string,
};

export default function Login() {
    const { register, handleSubmit, watch, errors } = useForm<Inputs>();
    const onSubmit = (data: Inputs) => console.log(data);

    console.log(watch("example")) // watch input value by passing the name of it

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