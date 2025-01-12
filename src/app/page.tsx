import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import LogoutButton from './components/LogoutButton';

export default async function HomePage() {
  // Obtener cookies
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get('accessToken');

  if (!accessToken) {
    redirect('/auth/login');
  }

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <p>¡Estás logueado!</p>

      <LogoutButton />
    </div>
  );
}
