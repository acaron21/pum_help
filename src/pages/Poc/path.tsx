import { useState } from "react";
import { getPathBeton } from "../../scripts/api/getPathBeton";
import clsx from "clsx";
import CircularLoader from "../../components/utils/loader";
import { AnimatePresence, motion } from "framer-motion";

type Article = {
    id: string;
    label: string;
    height?: number;
    copied?: boolean;
}

const starts: Article[] = [
    {id:"TE1824R", label:"VOILE A BRISE Ø1000 H70", height:70},
    {id:"TG0695R", label:"CUNETTE MULTI D200 HT350", height:35}
]

const ends: Article[] = [
    {id:"46233", label:"TAMPON TRAFIC LEGER VERROUILLABLE ROND D400", height:15},
]
export default function PathTool(){

    // Data
    const [selectedStartArticle, setSelectedStartArticle] = useState<Article>(starts[0]);
    const [selectedEndArticle, setSelectedEndArticle] = useState<Article>(ends[0]);
    const [targetHeight, setTargetHeight] = useState(0);

    const [result, setResult] = useState<Article[] | null>(null)


    const [loading, setLoading] = useState(false)

    const searchPath = async () =>{
        setResult(null)
        setLoading(true);
        const res = await  getPathBeton(
            selectedStartArticle.id, 
            /^-?\d+$/.test(selectedEndArticle.id) ? Number(selectedEndArticle.id) : selectedEndArticle.id,
             targetHeight
        )
        setResult(res);
        setLoading(false);

        
    }   
    
   const totalHeight = result?.reduce(
        (sum, article) => sum + (Number(article.height) || 0),
            0
            );

    return(
        <div className="flex  h-full p-2">
            
            {/* Selection */}
            <div className="flex flex-col justify-stretch items-stretch gap-1">
                <p className="  text-2xl font-bold text-blue-dark">Départ</p>
                {
                    starts.map(art => (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>{setSelectedStartArticle(art)}}>
                            <svg className={clsx(art.id === selectedStartArticle.id ? "fill-blue-primary" : "fill-white")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill-rule="evenodd" d="M21.162 6a2 2 0 0 0-.043-4c-2.147.023-4.067.071-5.77.134a2 2 0 1 0 .147 3.997A221 221 0 0 1 21.162 6m5.719-4a2 2 0 1 0-.043 4c2.113.023 3.998.07 5.666.131a2 2 0 0 0 .147-3.997c-1.703-.063-3.623-.11-5.77-.134M9.853 6.438a2 2 0 0 0-.299-3.99l-.72.057c-3.413.277-6.052 2.916-6.329 6.329q-.028.345-.056.72a2 2 0 1 0 3.989.299l.054-.696C6.611 7.7 7.699 6.611 9.157 6.492zm28.593-3.99a2 2 0 1 0-.299 3.99l.695.054c1.46.119 2.547 1.207 2.666 2.665l.054.696a2 2 0 1 0 3.99-.299l-.057-.72c-.277-3.413-2.916-6.052-6.328-6.329q-.346-.028-.721-.056M6.13 15.497a2 2 0 0 0-3.997-.148c-.063 1.704-.11 3.624-.134 5.771a2 2 0 1 0 4 .043c.023-2.113.07-3.999.131-5.666m39.735-.148a2 2 0 1 0-3.997.148c.061 1.667.108 3.553.131 5.666a2 2 0 1 0 4-.043a221 221 0 0 0-.134-5.77M46 26.881a2 2 0 0 0-4-.043a217 217 0 0 1-.131 5.666a2 2 0 1 0 3.997.148c.063-1.704.11-3.624.134-5.771m-40-.043a2 2 0 1 0-4 .043c.023 2.147.071 4.067.134 5.77a2 2 0 1 0 3.997-.147A218 218 0 0 1 6 26.838m.438 11.31a2 2 0 1 0-3.99.298l.057.72c.277 3.413 2.916 6.052 6.329 6.329q.345.028.72.056a2 2 0 0 0 .299-3.989l-.696-.054c-1.458-.118-2.546-1.207-2.665-2.665zm39.113.298a2 2 0 0 0-3.989-.299l-.054.695c-.119 1.46-1.207 2.547-2.666 2.666l-.695.054a2 2 0 0 0 .299 3.99l.72-.057c3.413-.277 6.052-2.916 6.329-6.328q.028-.346.056-.721m-30.055 3.423a2 2 0 1 0-.148 3.997q2.553.096 5.77.134a2 2 0 0 0 .044-4a217 217 0 0 1-5.666-.131m17.156 3.997a2 2 0 1 0-.148-3.997a217 217 0 0 1-5.666.131a2 2 0 0 0 .043 4c2.147-.023 4.068-.071 5.77-.134m-.91-34.126C30 11.615 27.455 11.5 24 11.5s-6 .115-7.742.24a4.836 4.836 0 0 0-4.518 4.518C11.615 18 11.5 20.545 11.5 24s.115 6 .24 7.742a4.836 4.836 0 0 0 4.518 4.518c1.742.125 4.287.24 7.742.24s6-.115 7.742-.24a4.836 4.836 0 0 0 4.518-4.518c.125-1.742.24-4.287.24-7.742s-.115-6-.24-7.742a4.836 4.836 0 0 0-4.518-4.518" clip-rule="evenodd"/></svg>
                        
                            <p className="bg-blue-primary font-semibold px-2 py-0.1 text-white">{art.id}</p>
                            <p className="bg-blue-primary/10 px-2 py-0.1">{art.label}</p>
                        </div>
                    ))
                }
                 <div className="h-[1px] bg-blue-dark/20 my-3"></div>
                <p className="  text-2xl font-bold text-blue-dark">Arrivé</p>
                {
                    ends.map(art => (
                        <div className="flex items-center gap-2 cursor-pointer" onClick={()=>{setSelectedEndArticle(art)}}>
                             <svg className={clsx(art.id === selectedEndArticle.id ? "fill-blue-primary" : "fill-white")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><path fill-rule="evenodd" d="M21.162 6a2 2 0 0 0-.043-4c-2.147.023-4.067.071-5.77.134a2 2 0 1 0 .147 3.997A221 221 0 0 1 21.162 6m5.719-4a2 2 0 1 0-.043 4c2.113.023 3.998.07 5.666.131a2 2 0 0 0 .147-3.997c-1.703-.063-3.623-.11-5.77-.134M9.853 6.438a2 2 0 0 0-.299-3.99l-.72.057c-3.413.277-6.052 2.916-6.329 6.329q-.028.345-.056.72a2 2 0 1 0 3.989.299l.054-.696C6.611 7.7 7.699 6.611 9.157 6.492zm28.593-3.99a2 2 0 1 0-.299 3.99l.695.054c1.46.119 2.547 1.207 2.666 2.665l.054.696a2 2 0 1 0 3.99-.299l-.057-.72c-.277-3.413-2.916-6.052-6.328-6.329q-.346-.028-.721-.056M6.13 15.497a2 2 0 0 0-3.997-.148c-.063 1.704-.11 3.624-.134 5.771a2 2 0 1 0 4 .043c.023-2.113.07-3.999.131-5.666m39.735-.148a2 2 0 1 0-3.997.148c.061 1.667.108 3.553.131 5.666a2 2 0 1 0 4-.043a221 221 0 0 0-.134-5.77M46 26.881a2 2 0 0 0-4-.043a217 217 0 0 1-.131 5.666a2 2 0 1 0 3.997.148c.063-1.704.11-3.624.134-5.771m-40-.043a2 2 0 1 0-4 .043c.023 2.147.071 4.067.134 5.77a2 2 0 1 0 3.997-.147A218 218 0 0 1 6 26.838m.438 11.31a2 2 0 1 0-3.99.298l.057.72c.277 3.413 2.916 6.052 6.329 6.329q.345.028.72.056a2 2 0 0 0 .299-3.989l-.696-.054c-1.458-.118-2.546-1.207-2.665-2.665zm39.113.298a2 2 0 0 0-3.989-.299l-.054.695c-.119 1.46-1.207 2.547-2.666 2.666l-.695.054a2 2 0 0 0 .299 3.99l.72-.057c3.413-.277 6.052-2.916 6.329-6.328q.028-.346.056-.721m-30.055 3.423a2 2 0 1 0-.148 3.997q2.553.096 5.77.134a2 2 0 0 0 .044-4a217 217 0 0 1-5.666-.131m17.156 3.997a2 2 0 1 0-.148-3.997a217 217 0 0 1-5.666.131a2 2 0 0 0 .043 4c2.147-.023 4.068-.071 5.77-.134m-.91-34.126C30 11.615 27.455 11.5 24 11.5s-6 .115-7.742.24a4.836 4.836 0 0 0-4.518 4.518C11.615 18 11.5 20.545 11.5 24s.115 6 .24 7.742a4.836 4.836 0 0 0 4.518 4.518c1.742.125 4.287.24 7.742.24s6-.115 7.742-.24a4.836 4.836 0 0 0 4.518-4.518c.125-1.742.24-4.287.24-7.742s-.115-6-.24-7.742a4.836 4.836 0 0 0-4.518-4.518" clip-rule="evenodd"/></svg>
                        
                            <p className="bg-blue-primary font-semibold px-2 py-0.1 text-white">{art.id}</p>
                            <p className="bg-blue-primary/10 px-2 py-0.1">{art.label}</p>
                        </div>
                    ))
                }
                
                <div className="h-[1px] bg-blue-dark/20 my-3"></div>
                {/* Height + search button */}
                <div className="flex gap-2 items-center">
                    <p className="  text-lg font-bold text-blue-dark">Hauteur cible :</p>
                    <input value={targetHeight} onKeyDown={(e)=>{if(e.key === "Enter"){searchPath()}}} onChange={(e)=>{setTargetHeight(parseInt(e.currentTarget.value))}} type="number" className="bg-blue-light px-3 py-1 rounded-lg outline-0 w-[100px]" />
                    
                    
                       
                        <div className="ms-auto p-2 bg-blue-primary rounded-xl cursor-pointer flex items-center justify-center w-[40px] h-[40px]" onClick={()=>{searchPath()}}>
                            {
                                 loading 
                        ? <CircularLoader size={20} strokeWidth={2} speed={2} className="text-white flex-1" />
                        :   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path fill="white" d="m280.16 242.79l-26.11-26.12a32 32 0 0 0-45.14-.12L27.38 384.08c-6.61 6.23-10.95 14.17-11.35 23.06a32.1 32.1 0 0 0 9.21 23.94l39 39.43a.5.5 0 0 0 .07.07A32.3 32.3 0 0 0 87 480h1.18c8.89-.33 16.85-4.5 23.17-11.17l168.7-180.7a32 32 0 0 0 .11-45.34M490 190l-.31-.31l-34.27-33.92a21.46 21.46 0 0 0-15.28-6.26a21.9 21.9 0 0 0-12.79 4.14c0-.43.06-.85.09-1.22c.45-6.5 1.15-16.32-5.2-25.22a258 258 0 0 0-24.8-28.74a.6.6 0 0 0-.08-.08c-13.32-13.12-42.31-37.83-86.72-55.94A139.6 139.6 0 0 0 257.56 32C226 32 202 46.24 192.81 54.68a120 120 0 0 0-14.18 16.22a16 16 0 0 0 18.65 24.34a75 75 0 0 1 8.58-2.63a63.5 63.5 0 0 1 18.45-1.15c13.19 1.09 28.79 7.64 35.69 13.09c11.7 9.41 17.33 22.09 18.26 41.09c.18 3.82-7.72 18.14-20 34.48a16 16 0 0 0 1.45 21l34.41 34.41a16 16 0 0 0 22 .62c9.73-8.69 24.55-21.79 29.73-25c7.69-4.73 13.19-5.64 14.7-5.8a19.2 19.2 0 0 1 11.29 2.38a1.24 1.24 0 0 1-.31.95l-1.82 1.73l-.3.28a21.52 21.52 0 0 0 .05 30.54l34.26 33.91a21.45 21.45 0 0 0 15.28 6.25a21.7 21.7 0 0 0 15.22-6.2l55.5-54.82c.19-.19.38-.39.56-.59A21.87 21.87 0 0 0 490 190"/></svg>
                            }
                            
                        </div>
                    
                    
                </div>
            </div>
            
            {/* Result */}
            <div className=" flex-1 p-10">
                {
                    result && 
                    
                    <>
                    <AnimatePresence>

                    
                        {
                            result.length === 0 

                            ? <div className="bg-red-primary text-center text-xl text-white py-1 rounded-md">Auncun résultats</div>

                            :

                            <div className="flex flex-col gap-2">
                                {
                                    result.map((art, index) => (
                                        <motion.div
                                                key={index}
                                                className="flex gap-2"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 600,
                                                    damping: 20,
                                                    delay: 0.3 + index * 0.15
                                                }}
                                                >
                                                    {art.copied && <div>copied</div>}
                                                    <div className="bg-blue-primary/30 px-2 py-0.1 rounded-l-md">{art.id}</div>
                                                    <div className=" flex-1 bg-blue-primary/10 px-2 py-0.1 ">{art.label}</div>
                                                    <div className="ms-auto bg-blue-primary/30 px-2 py-0.1 rounded-r-md">H :{art.height}</div>
                                                    
                                        </motion.div>
                                        
                                    ))
                                }
                                <motion.div className="text-end"><span className="font-bold">Hauteur totale</span> : {totalHeight}</motion.div>
                            </div>
                        
                        }
                    </AnimatePresence>
                    </>
                        
                    
                }
                
            </div>
        </div>
    )
}