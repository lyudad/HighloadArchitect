import React, {useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    useMutation, useQuery
  } from "react-query";

import { apiPath } from 'Consts/api';

type Inputs = {
    email: string,
    password: string,
};

export default function Login() {
    const { isLoading, error, data, isFetching } = useQuery("userProfile", () => {
        console.log('localStorage.getItem(', localStorage.getItem('token'))
         return axios.get(`${apiPath}/profiles`, {
           headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
         }
        )},
         {
          enabled: !!localStorage.getItem('token')
         }
    );

   console.log('data>>>>', data)

    return (
        <>
           {data && <div>hkjhkjhkjhk</div>}
        </>
    );
}