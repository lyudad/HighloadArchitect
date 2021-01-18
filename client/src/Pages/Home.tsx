import React, {useEffect} from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Home() {
  const { isLoading, error, data, isFetching } = useQuery("userData", () => {
    console.log('localStorage.getItem(', localStorage.getItem('token'))
     return axios.get('http://ec2-52-59-247-125.eu-central-1.compute.amazonaws.com:8000/auth', {
       headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
     }
    )},
     {
      enabled: !!localStorage.getItem('token')
     }
  );

  useEffect(()=> {
    localStorage.removeItem("token")
  }, [error])

  console.log('data>>>>>>>>>', error, data)
  return (
      <div>
        {data?.data.firstName ? `Hello ${data?.data.firstName}` : 'Home page'}
      </div>
  );
}
