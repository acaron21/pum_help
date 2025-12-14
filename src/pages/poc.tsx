import clsx from "clsx";
import { div } from "framer-motion/client";
import { useState } from "react";
import ConnexionTool from "./Poc/connexions";
import PathTool from "./Poc/path";


export default function PoCPage(){

    const [activeTab, setActiveTab] = useState("Connexion")

    return (
        
        <div className="h-full w-full flex flex-row p-2">

            {/* Side menu */}
            <div className="border-r-1 border-blue-semi-light/30 flex flex-col">

                {/* Connexions */}
                <div onClick={()=>setActiveTab("Connexion")} className={clsx("flex items-center gap-2 px-3 py-1 select-none cursor-pointer transition" , activeTab === "Connexion" ? "text-blue-dark bg-blue-primary/20" : "text-blue-dark/70 hover:text-blue-dark")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.4 7.5c.8.8.8 2.1 0 2.8l-2.8 2.8l-7.8-7.8l2.8-2.8c.8-.8 2.1-.8 2.8 0l1.8 1.8l3-3l1.4 1.4l-3 3zm-5.8 5.8l-1.4-1.4l-2.8 2.8l-2.1-2.1l2.8-2.8l-1.4-1.4l-2.8 2.8l-1.5-1.4l-2.8 2.8c-.8.8-.8 2.1 0 2.8l1.8 1.8l-4 4l1.4 1.4l4-4l1.8 1.8c.8.8 2.1.8 2.8 0l2.8-2.8l-1.4-1.4z"/></svg>
                    <p className="text-xl">Connexion</p>
                </div>

                <div onClick={()=>setActiveTab("Montage")} className={clsx("flex items-center gap-2 px-3 py-1 select-none cursor-pointer transition" , activeTab === "Montage" ? "text-blue-dark bg-blue-primary/20" : "text-blue-dark/70 hover:text-blue-dark")}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path fill="currentColor" d="M432 32a63.973 63.973 0 0 0-34.344 117.963L355.894 296.13A64 64 0 0 0 352 296a63.66 63.66 0 0 0-38.193 12.678l-77.154-64.295A64 64 0 1 0 131.259 269.7l-45.292 90.588A64 64 0 0 0 80 360a64.082 64.082 0 1 0 36.243 11.29l42.8-85.589a63.85 63.85 0 0 0 59.982-14.356l74.7 62.252a64 64 0 1 0 92.621-27.56l41.76-146.167c1.289.078 2.585.13 3.894.13a64 64 0 0 0 0-128M80 456a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32m96-200a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32m176 136a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32m80-264a32 32 0 1 1 32-32a32.036 32.036 0 0 1-32 32"/></svg>
                    <p className="text-xl">Montage</p>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1">
                {
                    activeTab === "Connexion" && <ConnexionTool></ConnexionTool>
                    
                }

                {
                    activeTab === "Montage" && <PathTool></PathTool>
                    
                }
            </div>
        </div>
    )
}