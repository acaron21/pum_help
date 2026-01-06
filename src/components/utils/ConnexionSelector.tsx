
import type { ConnexionAction, ConnexionState } from "../../pages/Poc/path";
import clsx from "clsx";
import { useEffect } from "react";
import { getDiamOptions, getMaterialOptions, getSexeOptions, getTypeOptions } from "../../scripts/api/pathFetchs";
import { AnimatePresence, motion } from "framer-motion";
import CircularLoader from "./loader";

type Props = {
    state: ConnexionState
    dispatch:React.Dispatch<ConnexionAction>
}

export default function ConnexionSelector({state, dispatch}: Props){

    // INITIALIZATION
    useEffect(()=>{
        const test = async () =>{
            const res = await getMaterialOptions();
            dispatch({type: "SET_MATERIAL_OPTION", payload: res})
        }
        test()
    }, [])


    // Select material ==> get type options
    useEffect(()=>{
        
        const getTypesOptions = async () =>{
            if(state.selectedMaterial){
                const res = await getTypeOptions(state.selectedMaterial);

                dispatch({type: "SET_TYPE_OPTION", payload: res});
            }
        }

        if(state.selectedMaterial){
            console.log("mat selected")
            getTypesOptions();

            // reset other
            dispatch({type:"SET_SELECTED_TYPE", payload: null});
            dispatch({type:"SET_SELECTED_DIAM", payload: null});
            dispatch({type:"SET_SELECTED_SEXE", payload: null});

            dispatch({type: "SET_DIAM_OPTION", payload: []})
            dispatch({type: "SET_SEXE_OPTION", payload: []})
        }
    }, [state.selectedMaterial])

    // Select type ==> get diam options
    useEffect(()=>{
        
        const getDiamsOptions = async () =>{
            if(state.selectedType && state.selectedMaterial){
                const res = await getDiamOptions(state.selectedMaterial, state.selectedType);

                dispatch({type: "SET_DIAM_OPTION", payload: res});
            }
        }

        if(state.selectedMaterial && state.selectedType){
            console.log("type selected")
            getDiamsOptions();

            // reset other
            dispatch({type:"SET_SELECTED_DIAM", payload: null})
            dispatch({type:"SET_SELECTED_SEXE", payload: null});

            dispatch({type: "SET_SEXE_OPTION", payload: []})
        }
    }, [state.selectedType])

    // Select diam ==> get sexe options
    useEffect(()=>{
        
        const getSexesOptions = async () =>{
            if(state.selectedType && state.selectedMaterial && state.selectedDiam){
                const res = await getSexeOptions(state.selectedMaterial, state.selectedType, state.selectedDiam);

                dispatch({type: "SET_SEXE_OPTION", payload: res});
            }
        }

        if(state.selectedMaterial && state.selectedType && state.selectedDiam){
            console.log("diam selected")
            getSexesOptions();

            // Reset other
            dispatch({type:"SET_SELECTED_SEXE", payload: null});
        }
    }, [state.selectedDiam])
    
    
    return (
        <div className="w-[85%] flex gap-2">

            <AnimatePresence>

                {/* ----------------------MATERIAL ----------------------*/}
                {
                    state.connexionsOptions.materials.length > 0 && 

                    <motion.select
                        key={"material"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        // exit={{ opacity: 0, scale: 0.9 }}
                        transition={{type: "spring",stiffness: 600,damping: 20}} 
                        className={
                        clsx(
                            "p-2 pb-3 w-[25%] outline-0 bg-blue-light rounded-[5px] text-xl border-t-4",
                            state.selectedMaterial ? " border-green-500" : "border-orange-400",
                            state.connexionsOptions.materials.length == 0 ? "hidden" : ""
                        )}
                    
                        value={state.selectedMaterial ?? ""} onChange={(e) => dispatch({type: "SET_SELECTED_MATERIAL", payload: e.target.value})}>

                    <option value="" disabled hidden>Material</option>
                    {
                        state.connexionsOptions.materials.map(material => (
                            <option key={material} className="bg-white" value={material}>{material}</option>
                        ))
                    }
                    </motion.select>

                }
                {/* Loader */}
                {
                    state.connexionsOptions.materials.length == 0 &&
                    <div className="w-[25%] flex items-center justify-center">
                        <CircularLoader size={20}></CircularLoader>
                    </div>
                }

                {/* ---------------------- TYPE ----------------------*/}
                {
                    state.connexionsOptions.types.length > 0 && 

                    <motion.select
                        key={"type"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        // exit={{ opacity: 0, scale: 0.9 }}
                        transition={{type: "spring",stiffness: 600,damping: 20}} 
                        className={
                        clsx(
                            "p-2 pb-3 w-[25%] outline-0 bg-blue-light rounded-[5px] text-xl border-t-4",
                            state.selectedType ? " border-green-500" : "border-orange-400",
                        )}
                    
                        value={state.selectedType ?? ""} onChange={(e) => dispatch({type: "SET_SELECTED_TYPE", payload: e.target.value})}>

                    <option value="" disabled hidden>Type</option>
                    {
                        state.connexionsOptions.types.map(type => (
                            <option key={type} className="bg-white" value={type}>{type}</option>
                        ))
                    }
                    </motion.select>
                    
                }
                {/* Loader */}
                {
                    state.connexionsOptions.types.length == 0 && state.selectedMaterial &&
                    <div className="w-[25%] flex items-center justify-center">
                        <CircularLoader size={20}></CircularLoader>
                    </div>
                }

                {/* ---------------------- DIAM ----------------------*/}
                {
                    state.connexionsOptions.diams.length > 0 && 

                    <motion.select
                        key={"diam"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        // exit={{ opacity: 0, scale: 0.9 }}
                        transition={{type: "spring",stiffness: 600,damping: 20}} 
                        className={
                        clsx(
                            "p-2 pb-3 w-[25%] outline-0 bg-blue-light rounded-[5px] text-xl border-t-4",
                            state.selectedDiam ? " border-green-500" : "border-orange-400",
                        )}
                    
                        value={state.selectedDiam ?? ""} onChange={(e) => dispatch({type: "SET_SELECTED_DIAM", payload: e.target.value})}>

                    <option value="" disabled hidden>Diam</option>
                    {
                        state.connexionsOptions.diams.map(diam => (
                            <option key={diam} className="bg-white" value={diam}>{diam}</option>
                        ))
                    }
                    </motion.select>
                    
                }
                {/* Loader */}
                {
                    state.connexionsOptions.diams.length == 0 && state.selectedType &&
                    <div className="w-[25%] flex items-center justify-center">
                        <CircularLoader size={20}></CircularLoader>
                    </div>
                }


                {/* ---------------------- Sexe ----------------------*/}
                {
                    state.connexionsOptions.sexes.length > 0 && 

                    <motion.select
                        key={"sexe"}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        // exit={{ opacity: 0, scale: 0.9 }}
                        transition={{type: "spring",stiffness: 600,damping: 20}} 
                        className={
                        clsx(
                            "p-2 pb-3 w-[25%] outline-0 bg-blue-light rounded-[5px] text-xl border-t-4",
                            state.selectedSexe ? " border-green-500" : "border-orange-400",
                        )}
                    
                        value={state.selectedSexe ?? ""} onChange={(e) => dispatch({type: "SET_SELECTED_SEXE", payload: e.target.value})}>

                    <option value="" disabled hidden>Sexe</option>
                    {
                        state.connexionsOptions.sexes.map(sexe => (
                            <option key={sexe} className="bg-white" value={sexe}>{sexe}</option>
                        ))
                    }
                    </motion.select>
                    
                }
                {/* Loader */}
                {
                    state.connexionsOptions.sexes.length == 0 && state.selectedDiam &&
                    <div className="w-[25%] flex items-center justify-center">
                        <CircularLoader size={20}></CircularLoader>
                    </div>
                }

            </AnimatePresence>

        </div>
    )
}