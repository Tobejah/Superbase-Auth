import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const { session, signInUser } = UserAuth();
    const navigate = useNavigate()
    console.log(session)

    const SignInUser = async (e) => {
        e.preventDefault()
        setLoading(true)

        try{
            const result = await signInUser(email, password)

            if (result.success) {
                navigate("/dashboard");
            }
        }catch (err) {
            setError("an error occurred")
        } finally {
            setLoading(false)
            }
        }
        
    return (
        <div>
            <form onSubmit={SignInUser} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2'>Sign into your account</h2>
                <div className='mb-4'>
                    <label className='block mb-1' htmlFor='email'>Email</label>
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        id='email'
                        name='email'
                        placeholder='Enter your email'
                        className='w-full p-2 border border-gray-300 rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block mb-1' htmlFor='password'>Password</label>
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        id='password'
                        name='password'
                        placeholder='Enter your password'
                        className='w-full p-2 border border-gray-300 rounded'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className='w-full p-2 bg-black text-black rounded hover:bg-gray-800'
                >
                    Signin
                </button>
                {error && <p className= "text-red-600 text-center pt-4">{error}</p>}
                <p className='mt-4'>
                    Dont have an account? <Link to="/signup">Sign up!</Link>
                </p>
            </form>
        </div>
    );
}

export default Signin;
