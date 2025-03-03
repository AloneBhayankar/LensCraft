import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai" // Import icons for show/hide

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const [passwordVisible, setPasswordVisible] = useState(false) // State for password visibility toggle
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  // Function to create account
  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const loggedInUser = authService.getCurrentUser();
        if (loggedInUser) {
          dispatch(login(loggedInUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className='space-y-5'>
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", { required: true })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                }
              })}
            />

            <div className="relative">
              <Input
                label="Password: "
                placeholder="Enter your password"
                type={passwordVisible ? "text" : "password"} // Toggle input type based on visibility state
                {...register("password", { required: true })}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 mt-3 transform -translate-y-1/2 text-gray-500"
              >
                {passwordVisible ? (
                  <AiFillEye size={20} />
                ) : (
                  <AiFillEyeInvisible size={20} />
                )}
              </button>
            </div>

            <Button type="submit" className="w-full cursor-pointer hover:bg-blue-700">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup



