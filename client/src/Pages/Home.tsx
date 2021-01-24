import React, {useEffect} from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { apiPath } from 'Consts/api';

export default function Home() {
  const { isLoading, error, data, isFetching } = useQuery("userData", () => {
    console.log('localStorage.getItem(', localStorage.getItem('token'))
     return axios.get(`${apiPath}/auth`, {
       headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
     }
    )},
     {
      enabled: !!localStorage.getItem('token')
     }
  );

  useEffect(()=> {
    if(error){
      localStorage.removeItem("token")
    }  
  }, [error])

  console.log('data>>>>>>>>>', error, data)
  return (
      <div>
        {data?.data.firstName ? `Hello ${data?.data.firstName}` : 'Home page'}
      </div>
  );
}
