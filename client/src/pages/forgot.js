import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

const Forgot = () => {
    const [email, setEmail] = useState('')
    const [valid, setValid] = useState(0)
    const handleButton = () => {
        console.log(email)
        setValid(4)
        axios.get(`https://bdh-server.herokuapp.com/user/get?email=${email}`).then((res)=>{
            console.log(res.data[0].email)
            if (res.data[0].email === email){
                const postData = {
                    email: res.data[0].email
                }
                axios.post("https://bdh-server.herokuapp.com/user/auth/create", { email: email }).then((res)=>{
                    console.log(res.data)
                    setValid(3)
                    return 
                })
            } else {
                setValid(1)
            }
        }).catch((res)=>{
            setValid(2)
        })

    }
    return (
        <div>
           <h5>Forgot your Password?</h5>
           <h5>Please provide your email address in the box below and we will send a "change" your password link to your email.</h5>
            <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(event)=>{
                    setEmail(event.target.value)
                }}
            />
            <div>
            {valid !== 4 && <button onClick={handleButton}>Submit</button>}
            </div>
            {valid === 1 && <div>No account exists with the email provided, try again.</div>}
            {valid === 2 && <div>Something went wrong, try again.</div>}
            {valid === 3 && 
            <Redirect
            to={{
                pathname: '/verify',
                state: { email: email }
            }}/>}
        </div>
    )
}

export default Forgot