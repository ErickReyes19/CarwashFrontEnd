"use client";

import { signOut } from "@/auth"; 

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut();
        window.location.href = "/";  // Redirigir al login después del logout
    };

    return (
        <button onClick={handleLogout} className="w-full text-left">
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
