import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState("")

    const { session, signUpNewUser } = UserAuth();
    const navigate = useNavigate()
    console.log(session)

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)

        try{
            const result = await signUpNewUser(email, password)

            if (result.success) {
                navigate("/dashboard");
            }
        }catch (err) {
            setError("an errorrrr occurred")
        } finally {
            setLoading(false)
            }
        }
        
    return (
        <div>
            <form onSubmit={handleSignUp} className='max-w-md m-auto pt-24'>
                <h2 className='font-bold pb-2'>Log in to your account</h2>
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
                    Signup
                </button>
                {error && <p className= "text-red-600 text-center pt-4">{error}</p>}
                <p className='mt-4'>
                    Already have an account? <Link to="/signin">Sign in!</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;
