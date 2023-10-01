import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { loginUrl } from '../../components/constants/constantsUrl';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/auth.css';


const Schema = yup.object({
    email: yup.string().required('Enter your email'),
    password: yup.string().required('Enter your password')
});

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                const responseData = await response.json();
                if (responseData.accessToken) {
                    login(responseData.accessToken, responseData);
                    navigate('/');
                } else {
                    console.error('Token missing in response:', responseData);
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }


        } catch (error) {
            setIsLoading(false);
            console.error('Error during login:', error);
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email input */}
                <div>
                    <label>Email: </label>
                    <input type="email" {...register('email')} />
                    <div>{errors.email?.message}</div>
                </div>

                {/* Password input */}
                <div>
                    <label>Password: </label>
                    <input type="password" {...register('password')} />
                    <div>{errors.password?.message}</div>
                </div>

                {/* Submit button */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>

                <div className="error-message">{errors.name?.message}</div>

            </form>
        </div>
    );
}

export default Login;
