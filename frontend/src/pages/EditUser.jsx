import React, {useEffect} from 'react'
import Layout from './Layout'
import EditUserForm from '../components/EditUser'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate} from 'react-router-dom'
import { GetSession } from '../features/authSlice'

const EditUser = () => {
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
        <EditUserForm/>
    </Layout>
  )
}

export default EditUser