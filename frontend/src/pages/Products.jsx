import React, {useEffect} from 'react'
import Layout from './Layout'
import ProductList from '../components/ProductList'
import {useDispatch, useSelector} from "react-redux"
import { useNavigate} from 'react-router-dom'
import { GetSession } from '../features/authSlice'

const Products = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isError, user} = useSelector((state) => state.auth)

  useEffect(()=> {
    dispatch(GetSession())
  }, [dispatch])

  useEffect(() => {
    if(isError) {
      navigate("/")
    }
  }, [isError,user, navigate])
  return (
    <Layout>
        <ProductList/>
    </Layout>
  )
}

export default Products