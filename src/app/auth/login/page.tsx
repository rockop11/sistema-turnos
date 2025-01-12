'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { signIn } from "next-auth/react";

type LoginData = {
    email: string;
    password: string;
};

const Login = () => {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const onSubmit = async (data: LoginData) => {
        try {
            const response = await signIn("credentials", {
                redirect: false,
                email: data.email,
                password: data.password,
            });

            if (response?.error) {
                throw new Error(response.error);
            }

            setSuccess(true);

            router.push('/');
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError('Ocurrió un error al iniciar sesión');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl mb-4 text-center">Iniciar sesión</h2>

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

            <button onClick={() => signIn("google", { callbackUrl: "/" })} className="w-full mt-4 bg-red-500 text-white py-2 rounded-md">
                Iniciar sesión con Google
            </button>
        </div>
    );
};

export default Login;

