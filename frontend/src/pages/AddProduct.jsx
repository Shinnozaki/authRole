import React, {useEffect} from 'react'
import Layout from './Layout'
import AddProductForm from '../components/AddProduct'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate} from 'react-router-dom'
import { GetSession } from '../features/authSlice'

const AddProduct = () => {
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
        <AddProductForm/>
    </Layout>
  )
}

export default AddProduct