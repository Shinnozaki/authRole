import React, {useEffect} from 'react'
import Layout from './Layout'
import AddUserForm from '../components/AddUser'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate} from 'react-router-dom'
import { GetSession } from '../features/authSlice'



const AddUser = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError} = useSelector((state) => state.auth)

  useEffect(()=> {
    dispatch(GetSession())
  }, [dispatch])

  useEffect(() => {
    if(isError) {
      navigate("/")
    }
  }, [isError, navigate])
  return (
    <Layout>
        <AddUserForm/>
    </Layout>
  )
}

export default AddUser