// // // import React, { useEffect,useState } from "react";
// // // import Canvas from "./canvas/Canvas";
// // // import Chat from "./chat/Chat";
// // // import { HexColorPicker } from "react-colorful";



// // // function App() {

// // //   const [color, setColor] = useState("#aabbcc");
  
// // //     return (
// // //         <div>


// // //             <h1>Collaborative Whiteboard</h1>
// // //             <HexColorPicker color={color} onChange={(e)=>{setColor(e);console.log(e)}} />;
// // //             <Canvas color={color}/>
// // //             <Chat />
// // //         </div>
// // //     );
// // // }

// // // export default App;


// // import React, { useEffect, useState } from "react";
// // import Canvas from "./canvas/Canvas";
// // import Chat from "./chat/Chat";
// // import { HexColorPicker } from "react-colorful";

// // function App() {
// //     const [color, setColor] = useState("#aabbcc");
// //     const [width, setWidth] = useState(5); // Default line width

// //     return (
// //         <div>
// //             <h1>Collaborative Whiteboard</h1>

// //             <div>
// //                 <label>
// //                     Select Brush Color:{" "}
// //                     <HexColorPicker
// //                         color={color}
// //                         onChange={(e) => setColor(e)}
// //                     />
// //                 </label>
// //             </div>

// //             <div>
// //                 <label>
// //                     Select Brush Width:{" "}
// //                     <input
// //                         type="range"
// //                         min="1"
// //                         max="50"
// //                         value={width}
// //                         onChange={(e) => setWidth(parseInt(e.target.value))}
// //                     />
// //                     <span>{width}px</span>
// //                 </label>
// //             </div>

// //             <Canvas color={color} width={width} />
// //             <Chat />
// //         </div>
// //     );
// // }

// // export default App;
// import io from "socket.io-client";
// import React, { useState ,useEffect} from "react";
// import Canvas from "./canvas/Canvas";
// import Chat from "./chat/Chat";
// import { HexColorPicker } from "react-colorful";
// const socket = io("http://localhost:4000");
// function App() {
//     const [color, setColor] = useState("#aabbcc");
//     const [width, setWidth] = useState(5); // Default line width
//     const [tool, setTool] = useState("brush"); // Default tool is brush
//     const [activeUsers, setActiveUsers] = useState(0);
//     useEffect(() => {
//       // Listen for active user updates
//       socket.on("activeUsers", (count) => {
//           setActiveUsers(count);
//       });

//       return () => {
//           socket.off("activeUsers");
//       };
//   }, []);

//     return (
//         <div>
//             <h1>Collaborative Whiteboard</h1>

//             <div>
//                 <label>
//                     Select Brush Color:{" "}
//                     <HexColorPicker
//                         color={color}
//                         onChange={(e) => setColor(e)}
//                     />
//                 </label>
//             </div>

//             <div>
//                 <label>
//                     Select Brush Width:{" "}
//                     <input
//                         type="range"
//                         min="1"
//                         max="50"
//                         value={width}
//                         onChange={(e) => setWidth(parseInt(e.target.value))}
//                     />
//                     <span>{width}px</span>
//                 </label>
//             </div>

//             <div>
//                 <label>Select Tool: </label>
//                 <button
//                     onClick={() => setTool("brush")}
//                     style={{
//                         backgroundColor: tool === "brush" ? "lightblue" : "white",
//                     }}
//                 >
//                     Brush
//                 </button>
//                 <button
//                     onClick={() => setTool("eraser")}
//                     style={{
//                         backgroundColor: tool === "eraser" ? "lightblue" : "white",
//                     }}
//                 >
//                     Eraser
//                 </button>
//             </div>

//             <Canvas color={color} width={width} tool={tool} socket={socket} />
//             <Chat />
//         </div>
//     );
// }

// export default App;
import io from "socket.io-client";
import React, { useState, useEffect } from "react";
import Canvas from "./canvas/Canvas";
import Chat from "./chat/Chat";
import { HexColorPicker } from "react-colorful";
import "./styles.css"; // Import the CSS file

const socket = io("http://localhost:4000");

function App() {
    const [color, setColor] = useState("#aabbcc");
    const [width, setWidth] = useState(5); // Default line width
    const [tool, setTool] = useState("brush"); // Default tool is brush
    const [activeUsers, setActiveUsers] = useState(0);

    useEffect(() => {
        // Listen for active user updates
        socket.on("activeUsers", (count) => {
            setActiveUsers(count-2);
        });

        return () => {
            socket.off("activeUsers");
        };
    }, []);

    return (
        <div className="container">
            <h1>Collaborative Whiteboard</h1>
            <p>Active Users: {activeUsers}</p>

            <div className="toolbar">
                <div className="hexa">
                    <label>
                        <strong>Brush Color:</strong>{" "}
                        <HexColorPicker 
                            color={color}
                            onChange={(e) => setColor(e)}
                        />
                    </label>
                </div>

                <div>
                    <label>
                        <strong>Brush Width:</strong>
                        <input
                       
                            type="range"
                            min="1"
                            max="100"
                            value={width}
                            
                            onChange={(e) => setWidth(parseInt(e.target.value))}
                        />
                        <span>{width}px</span>
                    </label>
                </div>

                <div>
                    <label>
                        <strong>Tool:</strong>{" "}
                    </label>
                    <button
                        className={tool === "brush" ? "active" : ""}
                        onClick={() => setTool("brush")}
                    >
                        Brush
                    </button>
                    <button
                        className={tool === "eraser" ? "active" : ""}
                        onClick={() => setTool("eraser")}
                    >
                        Eraser
                    </button>
                </div>
            </div>

            <Canvas color={color} width={width} tool={tool} socket={socket} />
            <div className="chat">
                <Chat />
            </div>
        </div>
    );
}

export default App;
