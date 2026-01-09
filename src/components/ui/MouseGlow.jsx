import React, { useEffect, useRef } from 'react';

const MouseGlow = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                const x = e.clientX;
                const y = e.clientY;
                glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(37, 99, 235, 0.15), transparent 40%)`;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            ref={glowRef}
            className="fixed inset-0 pointer-events-none z-[60] transition-opacity duration-300 mix-blend-multiply"
            aria-hidden="true"
        />
    );
};

export default MouseGlow;
