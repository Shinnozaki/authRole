import React, {useEffect} from 'react'
import Layout from './Layout'
import EditProductForm from '../components/EditProduct'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate} from 'react-router-dom'
import { GetSession } from '../features/authSlice'

const EditProduct = () => {
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
        <EditProductForm/>
    </Layout>
  )
}

export default EditProduct