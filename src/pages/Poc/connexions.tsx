import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import CircularLoader from "../../components/utils/loader";
import { getConnexions } from "../../scripts/api/getConnexions";
import { div, p } from "framer-motion/client";

type Article = {
    id: number,
    label: string,
    courbure?: number
}

type Connexion = {
    port: string,
    material: string,
    sexe: string,
    type: string,
    diam: number,
    compatible_articles: Article[]
    }

export default function ConnexionTool(){

    const [mainArticleCode, setMainArticleCode] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setLoading] = useState(false);

    // Data
    const [article, setArticle] = useState<Article | undefined | null>(undefined)
    const [connexions, setConnexions] = useState<Connexion[] | undefined | null>(undefined)
    
    // filtred compatible product
    const [strFilter, setStrFilter] = useState("");
    const [selectedConnexionIndex, setSelectedConnexionIndex] = useState<number | null>(null)
    const selectedConnexion =
            selectedConnexionIndex !== null
                ? connexions?.[selectedConnexionIndex]?.compatible_articles ?? []
                : [] 
    
    const filtredCompatibleArticles = selectedConnexion.filter(a =>
                                                                        strFilter === "" ||
                                                                        a.id.toString().includes(strFilter) ||
                                                                        a.label.toLowerCase().includes(strFilter.toLowerCase()))

    


    // Search with cypher request
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) =>{

        if(e.key == "Enter"){
            setSelectedConnexionIndex(null)
            console.log("search for : ", mainArticleCode)
            fetchConnexions(mainArticleCode);
        }
    }

    const fetchConnexions = async (input:string) =>{
        setLoading(true);
        const result = await getConnexions(parseInt(input))
        setLoading(false)

        // no result
        if(!result[0]){setArticle(null)}
        else{
            // set article information
            setArticle(result[0].inputProduct as Article)
            
            // set connexions
            const _connexions: Connexion[] = await result[0].conns.map((conn: any) => ({
                port: conn.connexion.port,
                material: conn.connexion.material,
                sexe: conn.connexion.sexe,
                type: conn.connexion.type,
                diam: conn.connexion.diam,
                compatible_articles: conn.compatible_products
            }))
            
            setConnexions(_connexions);
        }
        console.log(result)
    }

    // Reset the research
    const resetResearch = () =>{
        setArticle(undefined);
        setConnexions(undefined);
        setSelectedConnexionIndex(null)
        setStrFilter("")
    }
    return(
        <div className="flex-1 overflow-hidden flex flex-col h-full p-3 box-border">

                    {/* Main input search */}
                    <div className="flex self-center items-center gap-2 bg-blue-light p-3 rounded-[50px]">
                        <svg className={clsx("transition duration-300", (mainArticleCode !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                        <input onKeyDown={(e)=>onKeyDown(e)} ref={inputRef} value={mainArticleCode} onChange={(e)=>setMainArticleCode(e.target.value)} className="flex-1 outline-0 text-xl" type="text" placeholder="Code article"/>
                        
                        {/* cross (delete) */}
                        
                       
                        <AnimatePresence>
                        {
                            (mainArticleCode !== "") && 
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="">

                                 <svg onClick={()=>{setMainArticleCode(""); inputRef.current?.focus(); resetResearch()}} className="fill-blue-primary cursor-pointer md:hover:transition md:hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M13.655 1.335a.7.7 0 0 0-.99-.99L7 6.01L1.335.345a.7.7 0 0 0-.99.99L6.01 7L.345 12.665a.7.7 0 0 0 .99.99L7 7.99l5.665 5.665a.7.7 0 1 0 .99-.99L7.99 7z" clip-rule="evenodd"/></svg>
                            </motion.div>
                        }
                        </AnimatePresence>
                   </div>
                    
                    {
                        // Loading
                        loading 
                        ? <CircularLoader size={80} strokeWidth={5} speed={2} className="text-blue-dark self-center flex-1" />
                        
                        :
                        <div className="flex-1 flex flex-col justify-center  ">
                            {/* No results :/ */}
                            {
                                article === null && 
                                    <div className="self-center flex items-center gap-5">
                                        <svg className="fill-red-primary" xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0m6.48 15.38a1 1 0 0 1-1.19.76A6.2 6.2 0 0 0 16 16a6 6 0 0 0-4.6 2.14a1 1 0 0 1-.76.36a1 1 0 0 1-.77-1.64A8 8 0 0 1 16 14a7.5 7.5 0 0 1 1.71.19a1 1 0 0 1 .77 1.19M9.5 9a2 2 0 1 1-2-2a2 2 0 0 1 2 2m5 0a2 2 0 1 1 2 2a2 2 0 0 1-2-2"/></svg>
                                        <p className="text-2xl text-red-primary">Article introuvable</p>
                                    </div>
                            }

                            {/* Result */}
                            <AnimatePresence>
                                {
                                    article && connexions && 
                                    
                                    <div className="flex-1 overflow-hidden self-start flex items-center ">
                                        
                                        {/* Main information (label, id, courbure) */}
                                        <motion.div className="flex flex-col px-2"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            // exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{type: "spring",stiffness: 600,damping: 20}}>
                                            
                                            <div className="flex items-center text-xl gap-3">
                                                <div className="bg-blue-primary p-1 rounded-md text-white">{article.label}</div>
                                                <div>{article.courbure}°</div>
                                            </div>
                                            <div className="ps-5 italic">Code : <span className="font-bold">{article.id}</span></div>
                                        </motion.div>

                                        {/* Connexions */}
                                        <div className="flex shrink-0 flex-col gap-y-2 px-3 border-l-2 border-blue-primary/20 select-none">
                                            {connexions.map((connexion, index) => (
                                                <motion.div
                                                key={index}
                                                className="grid grid-cols-[auto_auto_auto_auto_auto_auto_auto] gap-x-1 text-lg"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 600,
                                                    damping: 20,
                                                    delay: 0.3 + index * 0.15
                                                }}
                                                >
                                                {/* Port */}
                                                <div className="px-2 bg-blue-dark text-amber-50 rounded-l-md text-center">
                                                    {connexion.port}
                                                </div>

                                                {/* Material */}
                                                <div className="bg-blue-light px-1">
                                                    {connexion.material}
                                                </div>

                                                {/* Diam */}
                                                <div className="bg-blue-light px-1 text-center">
                                                    {connexion.diam}
                                                </div>

                                                {/* Type */}
                                                <div className="bg-blue-light px-1">
                                                    {connexion.type}
                                                </div>

                                                {/* Sexe */}
                                                <div
                                                    className={clsx(
                                                    "px-1 text-center",
                                                    connexion.sexe === "F"
                                                        ? "bg-rose-500/30"
                                                        : "bg-blue-500/50"
                                                    )}
                                                >
                                                    {connexion.sexe}
                                                </div>

                                                {/* Action */}
                                                <div onClick={()=>setSelectedConnexionIndex(index)} className="bg-blue-dark flex items-center justify-center fill-white rounded-e-md hover:bg-blue-dark/80 cursor-pointer transition">
                                                    <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    >
                                                    <path d="M21.4 7.5c.8.8.8 2.1 0 2.8l-2.8 2.8l-7.8-7.8l2.8-2.8c.8-.8 2.1-.8 2.8 0l1.8 1.8l3-3l1.4 1.4l-3 3zm-5.8 5.8l-1.4-1.4l-2.8 2.8l-2.1-2.1l2.8-2.8l-1.4-1.4l-2.8 2.8l-1.5-1.4l-2.8 2.8c-.8.8-.8 2.1 0 2.8l1.8 1.8l-4 4l1.4 1.4l4-4l1.8 1.8c.8.8 2.1.8 2.8 0l2.8-2.8l-1.4-1.4z" />
                                                    </svg>
                                                </div>

                                                <div className="self-center">
                                                    <svg className={clsx(index === selectedConnexionIndex ? "fill-blue-primary" : "fill-white")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill-rule="evenodd" d="M21.162 6a2 2 0 0 0-.043-4c-2.147.023-4.067.071-5.77.134a2 2 0 1 0 .147 3.997A221 221 0 0 1 21.162 6m5.719-4a2 2 0 1 0-.043 4c2.113.023 3.998.07 5.666.131a2 2 0 0 0 .147-3.997c-1.703-.063-3.623-.11-5.77-.134M9.853 6.438a2 2 0 0 0-.299-3.99l-.72.057c-3.413.277-6.052 2.916-6.329 6.329q-.028.345-.056.72a2 2 0 1 0 3.989.299l.054-.696C6.611 7.7 7.699 6.611 9.157 6.492zm28.593-3.99a2 2 0 1 0-.299 3.99l.695.054c1.46.119 2.547 1.207 2.666 2.665l.054.696a2 2 0 1 0 3.99-.299l-.057-.72c-.277-3.413-2.916-6.052-6.328-6.329q-.346-.028-.721-.056M6.13 15.497a2 2 0 0 0-3.997-.148c-.063 1.704-.11 3.624-.134 5.771a2 2 0 1 0 4 .043c.023-2.113.07-3.999.131-5.666m39.735-.148a2 2 0 1 0-3.997.148c.061 1.667.108 3.553.131 5.666a2 2 0 1 0 4-.043a221 221 0 0 0-.134-5.77M46 26.881a2 2 0 0 0-4-.043a217 217 0 0 1-.131 5.666a2 2 0 1 0 3.997.148c.063-1.704.11-3.624.134-5.771m-40-.043a2 2 0 1 0-4 .043c.023 2.147.071 4.067.134 5.77a2 2 0 1 0 3.997-.147A218 218 0 0 1 6 26.838m.438 11.31a2 2 0 1 0-3.99.298l.057.72c.277 3.413 2.916 6.052 6.329 6.329q.345.028.72.056a2 2 0 0 0 .299-3.989l-.696-.054c-1.458-.118-2.546-1.207-2.665-2.665zm39.113.298a2 2 0 0 0-3.989-.299l-.054.695c-.119 1.46-1.207 2.547-2.666 2.666l-.695.054a2 2 0 0 0 .299 3.99l.72-.057c3.413-.277 6.052-2.916 6.329-6.328q.028-.346.056-.721m-30.055 3.423a2 2 0 1 0-.148 3.997q2.553.096 5.77.134a2 2 0 0 0 .044-4a217 217 0 0 1-5.666-.131m17.156 3.997a2 2 0 1 0-.148-3.997a217 217 0 0 1-5.666.131a2 2 0 0 0 .043 4c2.147-.023 4.068-.071 5.77-.134m-.91-34.126C30 11.615 27.455 11.5 24 11.5s-6 .115-7.742.24a4.836 4.836 0 0 0-4.518 4.518C11.615 18 11.5 20.545 11.5 24s.115 6 .24 7.742a4.836 4.836 0 0 0 4.518 4.518c1.742.125 4.287.24 7.742.24s6-.115 7.742-.24a4.836 4.836 0 0 0 4.518-4.518c.125-1.742.24-4.287.24-7.742s-.115-6-.24-7.742a4.836 4.836 0 0 0-4.518-4.518" clip-rule="evenodd"/></svg>
                                                </div>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Compatible products */}
                                        {
                                            selectedConnexionIndex !== null  && 

                                                <motion.div className="max-h-[70vh] min-h-[70vh] overflow-hidden flex flex-col gap-1 bg-blue-light p-2 shadow-md rounded-xl"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                // exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{type: "spring",stiffness: 600,damping: 20}}>

                                                    {/* Research bar */}
                                                    <div className="flex self-start items-center gap-2 bg-white p-1 px-3 rounded-[50px]">
                                                        <svg className={clsx("transition duration-300", (mainArticleCode !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                                                        <input value={strFilter} onChange={(e)=>setStrFilter(e.target.value.toUpperCase())} className="flex-1 outline-0 text-md" type="text" placeholder="Code, label"/>
                                                        
                                                        {/* cross (delete) */}
                                                        
                                                    
                                                        <AnimatePresence>
                                                        {
                                                            (mainArticleCode !== "") && 

                                                            <motion.div
                                                                initial={{ opacity: 0, scale: 0.95 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                exit={{ opacity: 0, scale: 0.95 }}
                                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                                className="">

                                                                <svg onClick={()=>{setStrFilter("")}} className="fill-blue-primary cursor-pointer md:hover:transition md:hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M13.655 1.335a.7.7 0 0 0-.99-.99L7 6.01L1.335.345a.7.7 0 0 0-.99.99L6.01 7L.345 12.665a.7.7 0 0 0 .99.99L7 7.99l5.665 5.665a.7.7 0 1 0 .99-.99L7.99 7z" clip-rule="evenodd"/></svg>
                                                            </motion.div>
                                                        }
                                                        </AnimatePresence>
                                                    </div>

                                                    {/* Compatible articles */}
                                                    <div className="flex-1 overflow-y-auto">
                                                        <table className="  p-0.5 border-separate">
                                                            <tbody>
                                                                {
                                                                    filtredCompatibleArticles.map((article)=>(
                                                                        
                                                                        <tr className="cursor-pointer " key={article.id}>
                                                                            <td className="px-2 py-0.5 bg-blue-dark/80 text-white hover:bg-blue-dark/90 transition">{article.id}</td>
                                                                            <td onClick={()=>{resetResearch(); setMainArticleCode(article.id.toString()); fetchConnexions(article.id.toString())}} className="px-2 py-0.5 bg-blue-dark/10 hover:bg-blue-dark/15 transition">{article.label}</td>
                                                                        </tr>
                                                                        
                                                                    ))
                                                                }
                                                            </tbody>
                                                            
                                                        </table>
                                                    </div>
                                                    
                                                
                                        </motion.div>
                                        }
                                        

                                         
                                    </div>
                                    
                                }
                            </AnimatePresence>

                        </div>
                    }
                    

        </div>
    )
}