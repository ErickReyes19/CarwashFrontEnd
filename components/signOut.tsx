"use client";

import { signOut } from "@/auth"; 

const LogoutButton = () => {
    const handleLogout = async () => {
        await signOut();
    };

    return (
        <button onClick={handleLogout} className="w-full text-left">
            Cerrar sesión
        </button>
    );
};

export default LogoutButton;
