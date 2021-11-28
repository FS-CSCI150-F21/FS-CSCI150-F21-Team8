import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const Verify = () => {
    let location = useLocation()
    const email = location.state.email
    // console.log(location.state.email)
    
    const [password, setPassword] = useState('')
    const [checkPass, setcheckPass] = useState('')
    // console.log(password)
    const [otp, setOtp] = useState()
    const [valid, setValid] = useState(0)
    const handleButton = () => {
        console.log(password, checkPass)
        setValid(4)
        if (checkPass === password){
            axios.get(`https://bdh-server.herokuapp.com/user/auth/check?email=${email}&otp=${otp}`).then((res)=>{
            console.log(res.data)
            if (res.data.message === "Success"){
                
                axios.put(`https://bdh-server.herokuapp.com/user/update?email=${email}`, {password: password}).then((res)=>{
                    console.log(res.data)
                    setValid(5)
                })
            } else {
                setValid(1)
            }
        }).catch((res)=>{
            setValid(2)
        })} else {
            setValid(3)
        }
    }
    return (
        <div>
           <h5>Please enter in the four digit code sent to you via email, and type in a new password.</h5>
            Code
           <div>
            <input
                type="text"
                name="otp"
                value={otp}
                onChange={(event)=>{
                    setOtp(event.target.value)
                }}
            />
            </div>
            New Password
            <div>
            <input
                type="password"
                placeholder=""
                name="password"
                value={password}
                onChange={(event)=>{
                    setPassword(event.target.value)
                }}
            />
            </div>
            Re-enter the password
            <div>
            <input
                type="password"
                placeholder=""
                name="checkPass"
                value={checkPass}
                onChange={(event)=>{
                    setcheckPass(event.target.value)
                }}
            />
            </div>
            
            <div>
            {(valid !== 4 && valid !== 5) && <button onClick={handleButton}>Submit</button>}
            </div>
            {valid === 1 && <div>No account exists with the email provided, try again.</div>}
            {valid === 2 && <div>Something went wrong, try again.</div>}
            {valid === 3 && <div>Passwords must match.</div>}
            {valid === 5 && <div><div>Password change successful, click <Link to="/login">here</Link> to login</div>
                </div>}
        </div>
    )
}

export default Verify