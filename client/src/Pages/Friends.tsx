import axios from 'axios';
import { useQuery, useMutation } from "react-query";
import { apiPath } from 'Consts/api';

export interface IUserInfo {
    id: number,
    age: number,
    city: string,
    email: string,
    firstName: string,
    gender: string,
    interests: string,
    lastName: string
}

export default function Login() {
    const { error, data } = useQuery("userProfile", () => {
        console.log('localStorage.getItem(', localStorage.getItem('token'))
         return axios.get(`${apiPath}/friends`, {
           headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
         }
        )
    });

    return (
        <>
           <div>My friends</div>
           {
           data?.data.map((el: IUserInfo) => {
               return (
                <div style={{border: '1px solid black', padding: '20px'}}>
                    <div>{el.firstName}</div>
                    <div>{el.lastName}</div>
                    <div>{el.gender}</div>
                    <div>{el.city}</div>
                    <div>{el.interests}</div>
                </div>
               )
            })
           }
        </>
    );
}