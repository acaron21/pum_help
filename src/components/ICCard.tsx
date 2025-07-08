

import type { IC } from "../pages/ICPage";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


function InfoModal(props: {ic:IC, setShowInfoModal:(b: boolean)=>void}){
    console.log(props.ic.ic)
    return(
        
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{duration:0.2}}
            onClick={()=>{props.setShowInfoModal(false)}} className="hidden md:flex items-center justify-center absolute z-1000 top-0 left-0 h-screen w-screen bg-black/50">
                <div onClick={(e)=>e.stopPropagation()} className="bg-white w-[50%] min-h-[70%] rounded-xl flex flex-col">
                   
                   {/* title */}
                   <div className="relative w-[100%] flex flex-row justify-center items-center gap-4 p-3 bg-blue-primary rounded-t-xl">
                        <svg onClick={()=>props.setShowInfoModal(false)} className="fill-white cursor-pointer hover:fill-blue-dark transition absolute top-0 right-0 z-2000" xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24"><path  d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"/></svg>

                        {props.ic.imgs.map(img=>(
                            <img key={img} src={`${import.meta.env.BASE_URL}/${img}`} alt="" className="object-contain w-[35px] h-[35px] md:w-[60px] md:h-[60px]"/>
                        ))}
                        {/* IC */}
                        <div className="absolute flex items-center justify-center top-0 left-[50%] transform translate-y-[-110%] translate-x-[-50%] bg-blue-light text-blue-dark  border-2 border-blue-dark p-1 rounded-md text-md md:text-3xl font-semibold ">
                            IC {props.ic.ic} 
                        </div>


                        {/* name */}
                        <div className="text-sm md:text-xl px-4 py-1 text-center text-white bg-blue-dark rounded-[50px]">
                            {props.ic.name}
                        </div>
                   </div>

                    {/* BODY */}
                   <div className="mb-auto p-4"><span className="font-bold">Commentaire : </span><br /><p  className="whitespace-pre-line">{props.ic.comment}</p></div>

                    <div className="hidden md:flex gap-1 p-2">
                            {props.ic.content.map(item=>(
                                <div className="text-sm md:text-md px-4 py-1 text-center text-white bg-blue-primary rounded-[10px]">{item}</div>
                            ))}
                        </div>
                   {/* FOOTER */}
                   <div className="flex flex-col bg-blue-primary rounded-b-xl text-white p-3">
                        {/* Contenu */}
                        <div className="flex gap-2"><span className="font-bold">Terms :</span><p className="italic"> {props.ic.dialects}</p></div>
                        <div className="flex gap-2"><span className="font-bold flex flex-nowrap">Mots clés :</span><p className="italic flex flex-wrap"> {props.ic.key_words.join(', ')}</p></div>
                   </div>
                </div>
        </motion.div>
    
    )
}


export default function ICCard(props: IC){

    const [copied, setCopied] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);

    const handleCopy = () => {
        const text = "" + props.ic;
        navigator.clipboard.writeText(text)
        .then(() => {

            setCopied(true);
            setTimeout(() => setCopied(false), 1000);
        })
        .catch(err => console.error("Erreur lors de la copie", err));
    };

      const handleRightClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.preventDefault(); 
        setShowInfoModal(true);
        
    };

    return (
        <>
        <div
        onContextMenu={handleRightClick}
        onClick={handleCopy}
        className="relative flex flex-row gap-3 items-center px-2 py-3 md:py-1 w-full shadow-md border-1 border-blue-light rounded-md transform transition duration-300 hover:bg-blue-light hover:scale-101 hover:z-10 cursor-pointer">
            {/* images */}
            <div className="flex justify-center gap-1 basis-[30%] md:basis-[15%]">
                {props.imgs.map(img=>(
                    <img key={img} src={`${import.meta.env.BASE_URL}/${img}`} alt="" className="object-contain w-[35px] h-[35px] md:w-[60px] md:h-[60px]"/>
                ))}
            </div>

            {/* IC */}
            <div className="text-md md:text-3xl font-semibold basis-[5%]">
                {props.ic}
            </div>

            {/* name */}
            <div className="text-sm md:text-xl px-4 py-1 text-center text-white bg-blue-dark rounded-[50px] basis-[50%] md:basis-[15%]">
                {props.name}
            </div>

            {/* Content */}
            <div className="hidden md:flex gap-1 basis-[30%]">
                {props.content.map(item=>(
                    <div className="text-sm md:text-md px-4 py-1 text-center text-white bg-blue-primary rounded-[10px]">{item}</div>
                ))}
            </div>

            {/* dialects */}
            <div className="hidden md:block flex-1 italic text-end">
                {props.dialects}
            </div>

            {/* Copied !  */}
            <AnimatePresence>
                {copied && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.7}}
                    animate={{ opacity: 1, scale:1}}
                    exit={{ opacity: 0,}}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute flex gap-2 items-center text-xl justify-center top-0 left-0 h-full w-full  px-3 py-1 rounded-md bg-blue-primary text-white"
                >  
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24"><path fill="#fff" fill-rule="evenodd" d="M15 1.25h-4.056c-1.838 0-3.294 0-4.433.153c-1.172.158-2.121.49-2.87 1.238c-.748.749-1.08 1.698-1.238 2.87c-.153 1.14-.153 2.595-.153 4.433V16a3.75 3.75 0 0 0 3.166 3.705c.137.764.402 1.416.932 1.947c.602.602 1.36.86 2.26.982c.867.116 1.97.116 3.337.116h3.11c1.367 0 2.47 0 3.337-.116c.9-.122 1.658-.38 2.26-.982s.86-1.36.982-2.26c.116-.867.116-1.97.116-3.337v-5.11c0-1.367 0-2.47-.116-3.337c-.122-.9-.38-1.658-.982-2.26c-.531-.53-1.183-.795-1.947-.932A3.75 3.75 0 0 0 15 1.25m2.13 3.021A2.25 2.25 0 0 0 15 2.75h-4c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812S4.025 4.705 3.89 5.71c-.138 1.029-.14 2.383-.14 4.29v6a2.25 2.25 0 0 0 1.521 2.13c-.021-.61-.021-1.3-.021-2.075v-5.11c0-1.367 0-2.47.117-3.337c.12-.9.38-1.658.981-2.26c.602-.602 1.36-.86 2.26-.981c.867-.117 1.97-.117 3.337-.117h3.11c.775 0 1.464 0 2.074.021M7.408 6.41c.277-.277.665-.457 1.4-.556c.754-.101 1.756-.103 3.191-.103h3c1.435 0 2.436.002 3.192.103c.734.099 1.122.28 1.399.556c.277.277.457.665.556 1.4c.101.754.103 1.756.103 3.191v5c0 1.435-.002 2.436-.103 3.192c-.099.734-.28 1.122-.556 1.399c-.277.277-.665.457-1.4.556c-.755.101-1.756.103-3.191.103h-3c-1.435 0-2.437-.002-3.192-.103c-.734-.099-1.122-.28-1.399-.556c-.277-.277-.457-.665-.556-1.4c-.101-.755-.103-1.756-.103-3.191v-5c0-1.435.002-2.437.103-3.192c.099-.734.28-1.122.556-1.399" clip-rule="evenodd"/></svg>
                    <div>Code IC copié ! </div>
                </motion.div>
                )}
            </AnimatePresence>
            
            
        </div>
        <AnimatePresence>
            {showInfoModal &&
                    <InfoModal ic={{...props}} setShowInfoModal={setShowInfoModal}/>
                }
        </AnimatePresence>
        </>
    )
}
