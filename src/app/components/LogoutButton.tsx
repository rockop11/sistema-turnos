'use client';

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    // Enviar una solicitud GET a la ruta de logout
    await fetch('/api/auth/logout', {
      method: 'GET',
    });

    // Redirigir al login
    router.push('/auth/login');
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
};

export default LogoutButton;
