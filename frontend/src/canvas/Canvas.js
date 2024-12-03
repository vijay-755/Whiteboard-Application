
import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

// Connect to the backend server
const socket = io("http://localhost:4000");

function Canvas({ socket, color, width, tool }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Set canvas size
        canvas.width = window.innerWidth - 40; // Adjusted for better margins
        canvas.height = window.innerHeight - 200;

        // Handle incoming drawing data
        socket.on("draw", ({ x, y, color, width }) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, width / 2, 0, Math.PI * 2);
            ctx.fill();
        });

        const draw = (e) => {
            if (e.buttons !== 1) return;
            const x = e.clientX;
            const y = e.clientY;

            // Emit drawing data
            socket.emit("draw", { x, y, color, width, tool });

            // Local drawing
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, width / 2, 0, Math.PI * 2);
            ctx.fill();
        };

        canvas.addEventListener("mousemove", draw);

        return () => {
            canvas.removeEventListener("mousemove", draw);
        };
    }, [socket, color, width, tool]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                margin: "20px auto",
                border: "1px solid #ddd",
            }}
        ></canvas>
    );
}

export default Canvas;
