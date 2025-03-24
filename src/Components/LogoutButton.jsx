import React from 'react'
import { useAtom } from 'jotai'
import { userAtom } from '../atom'
import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const LogoutButton = () => {
    const [,setUser] = useAtom(userAtom)
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("user")
        setUser(null)
        navigate('/sigin')
    }
  return (
    <button
    onClick={handleLogout}
    className='flex items-center gap-2 text-red-600 px-3 py-2 rounded'>
        <LogOut className='h-4 w-4' />
        Logout
    </button>
  )
}

export default LogoutButton
