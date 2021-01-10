import React from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

export default function Home() {
  const { isLoading, error, data, isFetching } = useQuery("userData", () => 
     axios.get('http://localhost:8000/auth', {headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}})
  );

  console.log('data>>>>>>>>>', data)
  return (
      <div>
        {data?.data.firstName ? `Hello ${data?.data.firstName}` : 'Home page'}
      </div>
  );
}
