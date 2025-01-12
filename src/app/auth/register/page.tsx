'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

type RegisterData = {
    name: string;
    email: string;
    password: string;
};

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>();
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const onSubmit = async (data: RegisterData) => {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Hubo un problema al registrar el usuario');
            }

            setSuccess(true);
        } catch (err) {
            console.log(err)
            setError(err.message || 'Ocurrió un error al registrar el usuario');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Registro de Usuario</h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {success && <p className="text-green-500 text-center mb-4">¡Registro exitoso! Ya puedes iniciar sesión.</p>}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <input
                        {...register('name', { required: 'Nombre es requerido' })}
                        type="text"
                        placeholder="Nombre"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>

                <div>
                    <input
                        {...register('email', { required: 'Email es requerido' })}
                        type="email"
                        placeholder="Email"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                    <input
                        {...register('password', { required: 'Contraseña es requerida' })}
                        type="password"
                        placeholder="Contraseña"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Registrarse
                </button>
            </form>
        </div>
    );
};

export default Register;
