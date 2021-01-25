import React, {useEffect} from 'react';
import axios from 'axios';

import { useQuery } from "react-query";

import { apiPath } from 'Consts/api';


export default function Login() {
    const { error, data } = useQuery("userData", () => {
        console.log('localStorage.getItem(', localStorage.getItem('token'))
         return axios.get(`${apiPath}/auth`, {
           headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
         }
        )},
         {
          enabled: !!localStorage.getItem('token')
         }
      );

    return (
        <>
            <div>{data?.data?.firstName}</div>
            <div>{data?.data?.lastName}</div>
            <div>{data?.data?.gender}</div>
            <div>{data?.data?.city}</div>
            <div>{data?.data?.interests}</div>
        </>
    );
}