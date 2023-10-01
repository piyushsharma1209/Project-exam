import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { registerUrl } from '../../components/constants/constantsUrl';
import { useNavigate } from 'react-router-dom';
import '../../styles/auth.css';
import { Link } from 'react-router-dom';

const Schema = yup.object({
    name: yup.string()
        .trim()
        .min(3, 'Must be at least 3 characters long')
        .max(30, 'Your name must be 30 characters or less')
        .matches(/^[a-zA-Z_]*$/, 'Valid characters: a-z, A-Z, and underscore.')
        .required('Enter your name'),
    email: yup.string()
        .matches(/^[\w\-.]+@stud.noroff.no$/, 'Only users with a stud.noroff.no email are allowed.')
        .required('Enter a valid email address'),
    password: yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be 20 characters or less')
        .required('Enter a password'),
});

async function RegisterUser(userData) {
    try {
        const response = await fetch(registerUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const responseData = await response.json();
            console.error('Registration failed. Server response:', responseData);
            return { success: false, message: responseData.message || 'Registration failed.' };
        }
    } catch (error) {
        console.error('Error during registration:', error);
        return { success: false, message: 'Registration failed. Please try again later.' };
    }
}

function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(Schema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setIsLoading(true);

        const result = await RegisterUser(data);

        if (result.success) {
            navigate('/login');
        } else {
            console.error('Registration failed:', result.message);
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name input */}
                <div>
                    <label>Name: </label>
                    <input type="text" {...register('name')} />
                    <div>{errors.name?.message}</div>
                </div>

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
                    {isLoading ? 'Registering...' : 'Register'}
                </button>

                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    Already have an account? <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
