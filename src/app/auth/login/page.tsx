// pages/auth/login.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type LoginData = {
    email: string;
    password: string;
};

const Login = () => {

    const router = useRouter()


    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (data: LoginData) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al iniciar sesión');
            }

            setSuccess(true);

            router.push('/')
        } catch (err) {
            setError(err.message || 'Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <div className="max-w-sm mx-auto p-4">
            <h2 className="text-2xl mb-4">Iniciar sesión</h2>

            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">¡Inicio de sesión exitoso!</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input
                    {...register('email', { required: 'Email es requerido' })}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border rounded-md"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}

                <input
                    {...register('password', { required: 'Contraseña es requerida' })}
                    type="password"
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 border rounded-md"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}

                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
                    Iniciar sesión
                </button>
            </form>
        </div>
    );
};

export default Login;
