import React, {useEffect, useContext} from 'react'
import { AuthContext } from './src/Context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute({children}) {
  const Navigate = useNavigate()
    const {user} = useContext(AuthContext)
    useEffect(()=> {
      if (!user) {
        Navigate("/signin")
      }
    }, [user, Navigate])
    
  return children
}
