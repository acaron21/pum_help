import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Article } from "../../pages/Poc/connexions";

export type Props = {
    onClose: ()=>void;
    articles: Article[];
    selectArticle: (id:string) => void
}

export default function ArticleSelector({onClose, articles, selectArticle}: Props){

    const inputRef = useRef<HTMLInputElement>(null);
    const [input, setInput] = useState("")


    useEffect(()=>{inputRef.current?.focus();},[])

    const filtered = articles.filter(a => 
        a.label.toUpperCase().includes(input.toUpperCase())
    );

    return (
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}
            onClick={()=>{onClose()}} 
            className="hidden overflow-hidden md:flex md:flex-col  items-center justify-start pt-5 absolute z-1000 top-0 left-0 h-screen w-screen bg-black/70">
            <div onClick={(e)=>e.stopPropagation()} className=" w-[70%] max-h-full rounded-xl flex flex-col py-5">
                
                {/* Research barre */}
                <div className="w-full flex self-center items-center gap-2 bg-blue-light p-3 rounded-[20px]">
                    <svg className={clsx("transition duration-300", (input !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                    <input ref={inputRef} value={input} onChange={(e)=>setInput(e.target.value)} className="flex-1 outline-0 text-xl" type="text" placeholder="Label..."/>
                    
                    {/* cross (delete) */}
                    <AnimatePresence>
                    {
                        (input !== "") && 
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="">

                            <svg onClick={()=>{setInput(""); inputRef.current?.focus()}} className="fill-blue-primary cursor-pointer md:hover:transition md:hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M13.655 1.335a.7.7 0 0 0-.99-.99L7 6.01L1.335.345a.7.7 0 0 0-.99.99L6.01 7L.345 12.665a.7.7 0 0 0 .99.99L7 7.99l5.665 5.665a.7.7 0 1 0 .99-.99L7.99 7z" clip-rule="evenodd"/></svg>
                        </motion.div>
                    }
                    </AnimatePresence>
                    
                
                </div>
                <p className="text-end pr-5 text-white text-lg"><span className="font-bold">{filtered.length}</span> résultats</p>
                {/* Results */}
                <div className={clsx("max-h-full overflow-y-auto  text-xl")}>
                    <table className="border-separate w-full">

                        <tbody>

                            {
                                filtered.map(art => (
                                    <tr onClick={()=>{selectArticle(art.id.toString())}} className="select-none cursor-pointer">
                                        <td className="bg-blue-dark text-white text-center px-3 py-0.5">{art.id}</td>
                                        <td className="bg-blue-light hover:bg-blue-light/90 transition px-3">{art.label}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>

                </div>
                
            </div>
        
        
        
        </motion.div>
    )
}