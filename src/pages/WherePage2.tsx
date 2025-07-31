import { useEffect, useRef, useState } from "react";
import MainPlan, { zones } from "../components/plan/MainPlan"
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { getProductData } from "../scripts/sheetService";
import type { ProductEntry } from "../scripts/sheetService";
import { div, p } from "framer-motion/client";







export default function WherePage(){

    const inputRef = useRef<HTMLInputElement>(null);
    
    const [selectedArticle, setSelectedArticle] = useState<ProductEntry | null>(null);
    const [selectedZonesIDs, setSelectedZonesIDs] = useState<number[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");

    // DATA FOR ZONES
    const [data, setData] = useState<ProductEntry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [result, setResult] = useState(true);
    const [selectedZone, setSelectedZone]= useState<string | null>(null);

    const [articleZones, setArticleZones] = useState<string[] | null>(null);


    // get data (from sheet/cache)
    useEffect(() => {
        getProductData()
        .then((res) => setData(res))
        .catch((err) => {
            console.error(err);
            setError('Erreur lors du chargement des données.');
            console.log("Erreur lors du chargement des données.")
        })
        .finally(() => setLoading(false));
    }, []);
    
    // Enter
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      console.log('Looking for :', searchInput);
      
        //Check for result

        // Zones check
        if(searchInput.startsWith("L") || searchInput.startsWith("M")){
            const zone = zones.filter((z) => z.zone===searchInput);
            if(zone.length===0){
                setResult(false);
            }
            else{
                setSelectedZone(searchInput);
                setSelectedZonesIDs(
                    zones.filter((z) => z.zone===searchInput).map(z => (z.id))
                )
            }
        }

        else if(data){
            const validArticle = data.filter((d)=> d.ref===searchInput)[0];

            if(!validArticle){
                setResult(false);
            }
            // Article found
            else{
                setSelectedArticle(validArticle);
                
                const artZones = data.filter((d)=>d.ref===validArticle.ref).map(d=>(d.zone))
                setArticleZones(
                    artZones
                )

                setSelectedZonesIDs(
                    zones.filter((z)=>artZones.includes(z.zone)).map(d=>(d.id))
                )
            }
        }
    }
  };

  useEffect(()=>{
    setResult(true);
    setSelectedZonesIDs([]);
    setSelectedZone(null);
    setSelectedArticle(null);
    setArticleZones(null)

  }, [searchInput])

    
    return (
        
        <div className="flex-1 flex flex-row h-full">
            
            <div className="relative flex-1 flex flex-col bg-white p-5">
                <p className="italic text-black/50">*Agence TLSD</p>
                {/* Research */}
                <div className="flex flex-row justify-center  top-0 bg-white/70 backdrop-blur-md p-4">
                    <div className="flex items-center gap-2 bg-blue-light p-3 rounded-[50px] md:w-[70%] w-full">
                        <svg className={clsx("transition duration-300", (searchInput !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                        <input ref={inputRef} value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} onKeyDown={handleKeyDown} className="flex-1 outline-0 text-xl" type="text" placeholder="Code article / code zone"/>
                        
                        {/* cross (delete) */}
                        <AnimatePresence>
                        {
                            (searchInput !== "") && 

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="">

                                 <svg onClick={()=>{setSearchInput(""); inputRef.current?.focus()}} className="fill-blue-primary cursor-pointer md:hover:transition md:hover:scale-110" xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 14 14"><path fill-rule="evenodd" d="M13.655 1.335a.7.7 0 0 0-.99-.99L7 6.01L1.335.345a.7.7 0 0 0-.99.99L6.01 7L.345 12.665a.7.7 0 0 0 .99.99L7 7.99l5.665 5.665a.7.7 0 1 0 .99-.99L7.99 7z" clip-rule="evenodd"/></svg>
                            </motion.div>
                        }
                        </AnimatePresence>
                   </div>
                    
                </div>
                
                {/* Result */}
                <div className="hidden md:flex self-center">
                    {!result &&
                        <p className="text-red-primary bg-red-primary/15 px-3 py-2 rounded-2xl">Aucun résultats</p>
                    }
                    {selectedZone &&
                    <div className="bg-blue-primary text-white text-2xl font-bold px-3 py-1 rounded-md">{selectedZone}</div>
                    }
                    {selectedArticle &&
                    <div className="flex flex-col gap-3 items-start  p-5">

                        <div className="flex items-center gap-3">
                            <p className="bg-blue-primary text-white text-2xl font-bold px-3 py-1 rounded-md">{selectedArticle.ref}</p>
                            <p className="text-xl">{selectedArticle.label}</p>
                        </div>

                        <div className="flex gap-2">
                            {articleZones?.map(art =>(
                            <div className="bg-blue-light text-blue-primary p-1">{art}</div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>

            {/* PLAN */}

            {/* Mobile */}
            <AnimatePresence>
                {
                    (selectedArticle || selectedZone)  && 

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-blue-light fixed top-0 left-0 h-screen w-screen flex flex-col z-500 p-3">

                        <div className="flex flex-row justify-between items-start">
                            <svg onClick={()=>setSearchInput("")} className="fill-blue-primary" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path  d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
                            {/* {selectedArticle && 
                                <ArticleCard sm={true} id={selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={selectArt} img_src={articles.filter(art => art.id === selectedArticle)[0].img}/>
                            } */}
                        </div>
                        
                        <div className="flex self-center">
                            {!result &&
                                <p className="text-red-primary bg-red-primary/15 px-3 py-2 rounded-2xl">Aucun résultats</p>
                            }
                            {selectedZone &&
                            <div className="bg-blue-primary text-white text-2xl font-bold px-3 py-1 rounded-md">{selectedZone}</div>
                            }
                            {selectedArticle &&
                            <div className="flex flex-col gap-3 items-start  p-5">

                                <div className="flex items-center gap-3">
                                    <p className="bg-blue-primary text-white text-2xl font-bold px-3 py-1 rounded-md">{selectedArticle.ref}</p>
                                    <p className="text-xl">{selectedArticle.label}</p>
                                </div>

                                <div className="flex gap-2">
                                    {articleZones?.map(art =>(
                                    <div className="bg-blue-light text-blue-primary p-1">{art}</div>
                                    ))}
                                </div>
                            </div>
                            }
                        </div>

                        <MainPlan selectedZones={selectedZonesIDs}></MainPlan>

                    </motion.div>
                }
            </AnimatePresence>

            {/* Big screen */}
            <div className="hidden md:flex  md:h-full md:bg-blue-light md:p-5">
                <MainPlan selectedZones={selectedZonesIDs}></MainPlan>
            </div>

        </div>

    )
}