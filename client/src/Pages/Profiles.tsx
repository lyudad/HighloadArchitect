import {useCallback} from 'react'
import axios from 'axios';
import { useQuery, useMutation } from "react-query";
import {debounce} from 'lodash'
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
         return axios.get(`${apiPath}/auth/profiles`, {
           headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
         }
        )},
         {
          enabled: !!localStorage.getItem('token')
         }
    );

    const addToFriendsMutation = useMutation((friendId: number) => axios.post(`${apiPath}/friends`, {friendId}, {
        headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
      }))

    const searchMutation = useMutation((data: {firstName: string, lastName: string}) => axios.post(`${apiPath}/auth/search`, data, {
        headers: {'authorization': `Bearer ${localStorage.getItem('token')}`}
      }))

    const onSearch = useCallback(debounce((input) => {
        console.log("input>>", input.target.value)
        const [firstName, lastName] = input.target.value.split(" ")
        searchMutation.mutate({firstName, lastName})
    }, 300), [searchMutation])

    return (
        <>
           <div>All profiles</div>
           <input placeholder="Search user" onChange={onSearch}/>
           {
           data?.data.map((el: IUserInfo) => {
               return (
                <div style={{border: '1px solid black', padding: '20px'}}>
                    <div>{el.firstName}</div>
                    <div>{el.lastName}</div>
                    <div>{el.gender}</div>
                    <div>{el.city}</div>
                    <div>{el.interests}</div>
                    <div 
                       style={{background: 'gray'}} 
                       onClick={()=>{addToFriendsMutation.mutate(el.id)}}
                    >
                        Add to friend
                    </div>
                </div>
               )
            })
           }
        </>
    );
}