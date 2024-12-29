// /app/(public)/layout.tsx
import React from 'react';

const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className="flex items-center justify-center min-h-screen">
            {children}
        </main>
    );
};

export default PublicLayout;
