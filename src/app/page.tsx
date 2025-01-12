"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	
	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/auth/login");
		}
	}, [status, router]);

	if (status === "loading") {
		return <p>Cargando...</p>;
	}

	return (
		<>
			<h3>Bienvenido, {session?.user?.name}</h3>
			<button
				onClick={() =>
					signOut({
						callbackUrl: "/auth/login",
					})
				}
			>
				Cerrar sesión
			</button>
		</>
	);
}
