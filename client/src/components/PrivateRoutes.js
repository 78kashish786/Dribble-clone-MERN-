import React , {useEffect,useState}from 'react'
import { useAuth } from '../assets/context/Auth'
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';


const PrivateRoutes = () => 
{

    const[ok,setOk] = useState(false);
    const[auth,setAuth]= useAuth();

    useEffect(()=>{
        const authCheck = async()=>{
            const response = await axios.get('/api/v1/auth/user-auth')
            if(response.data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        }   
        if(auth?.token) authCheck();
    },[auth?.token])

    return ok? <Outlet/> : <Spinner/>
}

export default PrivateRoutes
