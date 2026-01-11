import clsx from "clsx";
import { useEffect, useReducer, useState } from "react";
import { findPathWithArticles, findPathWithConnexions } from "../../scripts/api/pathFetchs";
import ConnexionSelector from "../../components/utils/ConnexionSelector";
import { AnimatePresence } from "framer-motion";
import type { Article } from "./connexions";
import CircularLoader from "../../components/utils/loader";
import ArticleSelector from "../../components/utils/ArticleSelector";
import { fetchGetAllArticles } from "../../scripts/api/getProducts";
import { getConnexions } from "../../scripts/api/getConnexions";

import MontageResult from "../../components/utils/PathsComponents";

export type Log = {
    state: "loading" | "failure" | "success",
    message: string
}

export type PathProduct = {
    id: number,
    label: string,
    in: {
        material: string,
        type: string,
        diam: string|number,
        sexe: string
    },
    out: {
        material: string,
        type: string,
        diam: string|number,
        sexe: string
    }
}

export type Path = {
    paths: PathProduct[]
}

// ---------- Types for articles selection
export type SelectedArticleState = {
    id: number,
    label: string,
    connexions: Connexion[], // all connexion 
    selectedPortIndex: number, // selected port where we start or finish (index)
}

export type Connexion = {
    port: string,
    material: string,
    sexe: string,
    type: string,
    diam: number,
    }

const emptySelectedArticleState: SelectedArticleState = {
    id: 0,
    label: "",
    connexions: [],
    selectedPortIndex: 0
}

// ---------- Types for connexions selection
export type ConnexionsOptions = {
    materials: string[];
    types: string[];
    diams: string[];
    sexes: string[];
}

export type ConnexionState = {
    connexionsOptions: ConnexionsOptions;

    selectedMaterial: string | null;
    selectedType: string | null;
    selectedDiam: string | null;
    selectedSexe: string | null;
}

export type ConnexionAction = 
    | {type: "SET_MATERIAL_OPTION", payload: string[]}
    | {type: "SET_TYPE_OPTION", payload: string[]}
    | {type: "SET_DIAM_OPTION", payload: string[]}
    | {type: "SET_SEXE_OPTION", payload: string[]}
    | {type: "SET_SELECTED_MATERIAL", payload: string|null}
    | {type: "SET_SELECTED_TYPE", payload: string |null}
    | {type: "SET_SELECTED_DIAM", payload: string|null}
    | {type: "SET_SELECTED_SEXE", payload: string|null}
    | {type: "RESET_ALL", payload: null}

type SelectedArticleAction = 
    | {type: "SET", payload: SelectedArticleState}
    | {type: "SET_ID", payload: number}
    | {type: "SET_LABEL", payload: string}
    | {type: "SET_CONNEXIONS", payload: Connexion[]}
    | {type: "SET_SELECTED_PORT", payload: number}

export const emptyConnexion: ConnexionState = {
    connexionsOptions: {
        diams: [],
        materials: [],
        sexes: [],
        types: []
    },
    selectedMaterial: null,
    selectedType: null,
    selectedDiam: null,
    selectedSexe: null
}

export function connexionReducer(state: ConnexionState, action: ConnexionAction): ConnexionState {
    switch(action.type){

        case "SET_MATERIAL_OPTION":
            return {
                ...state,
                connexionsOptions: {...state.connexionsOptions, materials: action.payload}
            };
        
        case "SET_TYPE_OPTION":
            return {
                ...state,
                connexionsOptions: {...state.connexionsOptions, types: action.payload}
            };

        case "SET_DIAM_OPTION":
            return {
                ...state,
                connexionsOptions: {...state.connexionsOptions, diams: action.payload}
            };

        case "SET_SEXE_OPTION":
            return {
                ...state,
                connexionsOptions: {...state.connexionsOptions, sexes: action.payload}
            };



        case "SET_SELECTED_MATERIAL":
            return {
                ...state,
                selectedMaterial: action.payload
            };

        case "SET_SELECTED_TYPE":
            return {
                ...state,
                selectedType: action.payload
            };

        case "SET_SELECTED_DIAM":
            return {
                ...state,
                selectedDiam: action.payload
            };

        case "SET_SELECTED_SEXE":
            return {
                ...state,
                selectedSexe: action.payload
            };

        case "RESET_ALL":
            return emptyConnexion;

        default:
            return state;


    }
}

export function selectedArticleReducer(state: SelectedArticleState, action: SelectedArticleAction) : SelectedArticleState{
    switch(action.type){
        case "SET":
            return action.payload;

        case "SET_ID":
            return {
                ...state,
                id: action.payload
            }
        case "SET_LABEL":
            return {
                ...state,
                label:action.payload
            }
        
        case "SET_CONNEXIONS":
            return{
                ...state,
                connexions: action.payload
            }
        case "SET_SELECTED_PORT":{
            return {
                ...state,
                selectedPortIndex: action.payload
            }
        }
        default: 
        return state
    }
}


export default function connexionsTools(){

    // UI variables
    const [activeTab, setActiveTab] = useState("connexions") // connexions | articles
    const [showSelecion, setShowSelection] = useState(true);

    // FOR CONNEXIONS SELECT
    const [connexionS, dispatchS] = useReducer(connexionReducer, emptyConnexion);
    const [connexionE, dispatchE] = useReducer(connexionReducer, emptyConnexion);

    // FOR ARTICLE SELECT
    const [articleS, dispatchAS] = useReducer(selectedArticleReducer, emptySelectedArticleState);
    const [articleE, dispatchAE] = useReducer(selectedArticleReducer, emptySelectedArticleState);
    
    const [searchArticleCodeS, setSearchArticleCodeS] = useState("");
    const [searchArticleCodeE, setSearchArticleCodeE] = useState("");

    // loaders
    const [loadingS, setLoadingS] = useState(false);
    const [loadingE, setLoadingE] = useState(false);

    // to fill the right code when opening str searching article
    // 1 or 2
    const [selectedESArticle, setSelectedESArticle] = useState<number | null>(null) 

    // Function from str searching, get the code selected
    const setArticleFromSearch = (code: string) =>{
        setShowStrSearching(false);
        
        // fill code
        if(selectedESArticle === 1){
            setSearchArticleCodeS(code);
            fetchAndFill(1, code);
        }
        else if(selectedESArticle === 2){
            setSearchArticleCodeE(code);
            fetchAndFill(2, code);
        }
    }

    // Search with cypher request | articleNb : 1 or 2 => which one is used
    const onSearchCode = (e: React.KeyboardEvent<HTMLInputElement>, articleNb: number, code: string) =>{
        if(e.key == "Enter"){
            fetchAndFill(articleNb, code);
        }
    }

    // fetch the given code, then get the connexion, and fill th UI
    const fetchAndFill = async (articleNb: number, code: string) => {

        // Choose which article is choosen
        fetchArticleConns(code, articleNb);
    }

    // Fetch the article + connexions
    const fetchArticleConns = async (input:string, articleNb: number) =>{
        if(articleNb === 1){dispatchAS({type: "SET", payload: emptySelectedArticleState});setLoadingS(true)}
        else if(articleNb === 2){dispatchAE({type: "SET", payload: emptySelectedArticleState});setLoadingE(true)}
        const result = await getConnexions(input)
        if(articleNb === 1){setLoadingS(false)}else if(articleNb === 2){setLoadingE(false)}

        // no result
        if(!result[0]){
            // If article id : 1 ==> means no result found
            if(articleNb === 1){dispatchAS({type:"SET_ID", payload: 1})}
            else if(articleNb === 2){dispatchAE({type:"SET_ID", payload: 1})}
        }
        else{
            
            // get connexions
            const _connexions: Connexion[] = await result[0].conns.map((conn: any) => ({
                port: conn.connexion.port,
                material: conn.connexion.material,
                sexe: conn.connexion.sexe,
                type: conn.connexion.type,
                diam: conn.connexion.diam
            }))

            const articleState: SelectedArticleState = {
                id: result[0].inputProduct.id,
                label: result[0].inputProduct.label,
                selectedPortIndex: 0,
                connexions: _connexions,
            }      
            
            // Set the right article
            if(articleNb === 1){
                dispatchAS({type: "SET", payload: articleState})
            }
            else if(articleNb === 2){
                dispatchAE({type: "SET", payload: articleState})
            }
        }
        console.log(result)
    }


    // Searching articles by string
    const [allArticles, setAllArticles] = useState<Article[]>([]);
    const [showStrSearching, setShowStrSearching] = useState(false);

    // Load all articles
    useEffect(()=>{
        const getAllArticles = async () =>{
            const res = await fetchGetAllArticles();
            setAllArticles(res);
        }

        getAllArticles();
    },[])
    
    // Reset all (switch article <-> connexions)
    const resetAll = () =>{
        setPaths([]);
        setPathIndex(0);
        setLogs([]);

        // connexions
        dispatchS({type:"RESET_ALL", payload: null})
        dispatchE({type:"RESET_ALL", payload: null})
    }

    // RESULTS
    const [paths, setPaths] = useState<Path[]>([]); // result
    const [loading, setLoading] = useState(false) // when we fetch the path
    const [logs, setLogs] = useState<Log[]>([]);

    const [pathIndex, setPathIndex] = useState(0);


    // Main function to find the path
    const findPath = async () =>{
        
        // reset logs
        setLogs([])

        // Check connexion search OR article search

        if(activeTab === "connexions"){
            // check if both connexions are completes
            if(connexionS.selectedMaterial && connexionS.selectedType && connexionS.selectedDiam &&  connexionS.selectedSexe && connexionE.selectedMaterial && connexionE.selectedType && connexionE.selectedDiam &&  connexionE.selectedSexe){
                
                setLoading(true);

                let success = false;
                let nb_articles = 1;
                
                // Check path for 1 to 5 articles
                while(!success && nb_articles<6){

                    // Update log
                    const log: Log = {message: `Recherche avec ${nb_articles} Article(s)`, state: "loading"}
                    setLogs(prev => [...prev, log]);

                    const res = await findPathWithConnexions(connexionS, connexionE, nb_articles);
                    console.log(res)

                    success = res.success;
                    nb_articles = nb_articles+1;

                    // Update log
                    setLogs(prev => {
                        if(prev.length === 0){return prev};

                        const lastIndex = prev.length -1;

                        return prev.map((item, index) => 
                            index === lastIndex 
                                ? {...item, state: success ? "success" : "failure"}
                                : item
                        )
                    })

                    if(success){
                        setPathIndex(0);
                        setPaths(res.paths)
                    }
                }

                setLoading(false);
                
            }
        }
        else if(activeTab === "articles"){

            if(articleS.id !== 0 && articleE.id !== 0 ){

                setLoading(true);

                let success = false;
                let nb_articles = 0;
                
                // Check path for 1 to 5 articles
                while(!success && nb_articles<4){

                    // Update log
                    const log: Log = {message: `Recherche avec ${nb_articles} Article(s)`, state: "loading"}
                    setLogs(prev => [...prev, log]);

                    const res = await findPathWithArticles(articleS, articleE, nb_articles);
                    console.log(res)

                    success = res.success;
                    nb_articles = nb_articles+1;

                    // Update log
                    setLogs(prev => {
                        if(prev.length === 0){return prev};

                        const lastIndex = prev.length -1;

                        return prev.map((item, index) => 
                            index === lastIndex 
                                ? {...item, state: success ? "success" : "failure"}
                                : item
                        )
                    })

                    if(success){
                        setPathIndex(0);
                        setPaths(res.paths)
                    }
                }

                setLoading(false);
            }
        }

    }

    return (
        <>
            {/* String searching code */}
            <AnimatePresence>
                {
                    showStrSearching && <ArticleSelector selectArticle={setArticleFromSearch} onClose={()=>setShowStrSearching(false)} articles={allArticles}></ArticleSelector>
                }
            </AnimatePresence>

            <div className="h-full w-full flex flex-col gap-2 p-2">
                
                {/* top section */}

                <div className={clsx("transition", showSelecion ? "flex" : "hidden")}>

                    {/* Selection side (left) */}
                    <div className="w-[70%] flex gap-2  pe-4">

                        {/* Tab selection */}
                        <div className="flex flex-col border-e-1 border-blue-primary/20">
                            <div className={clsx("p-2 select-none cursor-pointer", activeTab === "connexions" ? "bg-blue-primary/20" : "")} onClick={()=>setActiveTab("connexions")}>Connexions</div>
                            <div className={clsx("p-2 select-none cursor-pointer", activeTab === "articles" ? "bg-blue-primary/20" : "")} onClick={()=>{setActiveTab("articles"); resetAll()}}>Articles</div>
                        </div>

                        {/* tab contents */}
                        <div className="flex-1 ">

                            {/* connexions */}
                            {
                                activeTab === "connexions" &&
                                <div className="flex flex-col p-1">
                                    
                                    <div className="flex flex-col gap-3 pb-3">

                                        {/* Connexion entrée */}
                                        <div className="flex items-center text-center text-lg font-semibold">
                                            <p className={clsx("w-[15%]", connexionS.selectedMaterial && connexionS.selectedType && connexionS.selectedDiam &&  connexionS.selectedSexe && "text-green-600 border-s-2 border-green-500")}>Début</p>
                                            <ConnexionSelector state={connexionS} dispatch={dispatchS}></ConnexionSelector>
                                        </div>

                                        {/* Connexion Sortie */}
                                        <div className="flex items-center text-center text-lg font-semibold">
                                            <p className={clsx("w-[15%]", connexionE.selectedMaterial && connexionE.selectedType && connexionE.selectedDiam &&  connexionE.selectedSexe && "text-green-600 border-s-2 border-green-500")}>Fin</p>
                                            <ConnexionSelector state={connexionE} dispatch={dispatchE}></ConnexionSelector>
                                        </div>
                                    </div>

                                    {/* <div className="border-t-1 border-blue-dark/10 w-full"></div> */}
                                    
                                    

                                    {/* Article intermédiaire */}
                                    {/* <div className="pt-3 flex flex-col">
                                        <p>Article intermediaire</p> */}

                                        {/* Article */}
                                        {/* Main input search */}
                                        
                                    {/* </div> */}
                                </div>
                            }

                            {/* articles */}
                            {
                                activeTab === "articles" &&
                                <div className="flex flex-col gap-3">
                                    
                                    {/* Article 1 section */}
                                    <div className=" w-full flex gap-3">

                                        <p className="ps-4 self-center text-center text-lg font-semibold min-w-[100px]">Début</p>

                                        {/* Searching code */}
                                        {/* Main input search */}
                                        <div className="flex  self-center items-center gap-2 bg-blue-light p-1 rounded-[10px]">
                                            <svg className={clsx("flex-shrink-0 transition duration-300", (searchArticleCodeS !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                                            <input onKeyDown={(e)=>onSearchCode(e, 1, searchArticleCodeS)} value={searchArticleCodeS} onChange={(e)=>setSearchArticleCodeS(e.target.value)} className="flex-1 min-w-0 max-w-[120px] outline-0 text-md" type="text" placeholder="Code article"/>
                                            
                                            {/* Search by str */}
                                            <svg onClick={()=>{setShowStrSearching(true); setSelectedESArticle(1)}} className="flex-shrink-0 fill-blue-primary/90 cursor-pointer hover:fill-blue-primary hover:scale-105 transition" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M15.25 2h-6.5A6.76 6.76 0 0 0 2 8.75v6.5A6.76 6.76 0 0 0 8.75 22h6.5A6.76 6.76 0 0 0 22 15.25v-6.5A6.76 6.76 0 0 0 15.25 2m2 14.94a.78.78 0 0 1-.57.23a.8.8 0 0 1-.56-.23l-2-2a4.81 4.81 0 1 1 1.13-1.13l2 2a.79.79 0 0 1 .01 1.13z"/><path d="M14.5 11a3.21 3.21 0 1 1-6.418 0a3.21 3.21 0 0 1 6.418 0"/></svg>

                                        </div>

                                        {
                                            loadingS &&
                                            <CircularLoader size={20} strokeWidth={2} speed={2} className="self-center" />
                                        }

                                        {/* fetch result (Artilce info + connexion selection) */}

                                        {
                                            articleS.id === 1 
                                            ? <div>Pas de résultats</div>
                                            :
                                            <>
                                             {
                                                articleS.id != 1 && articleS.id != 0 &&

                                                <div className="flex flex-col items-start w-full">
                                                    {/* Article label */}
                                                    <p className="px-2 w-full py-1 rounded-t-[5px] bg-blue-dark text-white text-lg">{articleS.label}</p>
                                                    
                                                    {/* List of connexions */}
                                                    <table className="w-full border-collapse">
                                                        <tbody>
                                                            {articleS.connexions.map((conn, index) => {
                                                            const isSelected = articleS.selectedPortIndex === index

                                                            return (
                                                                <tr
                                                                key={index}
                                                                onClick={() =>
                                                                    dispatchAS({ type: "SET_SELECTED_PORT", payload: index })
                                                                }
                                                                className={clsx(
                                                                    "cursor-pointer transition-colors",
                                                                    "hover:bg-blue-50",
                                                                    isSelected && "bg-blue-100"
                                                                )}
                                                                >
                                                                {/* Sélection */}
                                                                <td className="w-6 text-center px-1 font-semibold text-blue-600">
                                                                    {isSelected ? "Départ" : ""}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200">
                                                                    {conn.port}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.material}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.type}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.diam}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.sexe}
                                                                </td>
                                                                </tr>
                                                            )
                                                            })}
                                                        </tbody>
                                                    </table>

                                                    
                                                </div>
                                             }
                                            </>
                                        }

                                    </div>

                                    <div className="w-full h-[2px] bg-blue-dark/40"></div>


                                    {/* Article 2 section */}
                                    <div className=" w-full flex gap-3">

                                        <p className="ps-4 self-center text-center text-lg font-semibold min-w-[100px]">Fin</p>

                                        {/* Searching code */}
                                        {/* Main input search */}
                                        <div className="flex  self-center items-center gap-2 bg-blue-light p-1 rounded-[10px]">
                                            <svg className={clsx("flex-shrink-0 transition duration-300", (searchArticleCodeE !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                                            <input onKeyDown={(e)=>onSearchCode(e, 2, searchArticleCodeE)} value={searchArticleCodeE} onChange={(e)=>setSearchArticleCodeE(e.target.value)} className="flex-1 min-w-0 max-w-[120px] outline-0 text-md" type="text" placeholder="Code article"/>
                                            
                                            {/* Search by str */}
                                            <svg onClick={()=>{setShowStrSearching(true); setSelectedESArticle(2)}} className="flex-shrink-0 fill-blue-primary/90 cursor-pointer hover:fill-blue-primary hover:scale-105 transition" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M15.25 2h-6.5A6.76 6.76 0 0 0 2 8.75v6.5A6.76 6.76 0 0 0 8.75 22h6.5A6.76 6.76 0 0 0 22 15.25v-6.5A6.76 6.76 0 0 0 15.25 2m2 14.94a.78.78 0 0 1-.57.23a.8.8 0 0 1-.56-.23l-2-2a4.81 4.81 0 1 1 1.13-1.13l2 2a.79.79 0 0 1 .01 1.13z"/><path d="M14.5 11a3.21 3.21 0 1 1-6.418 0a3.21 3.21 0 0 1 6.418 0"/></svg>

                                        </div>

                                        {
                                            loadingE &&
                                            <CircularLoader size={20} strokeWidth={2} speed={2} className="self-center" />
                                        }

                                        {/* fetch result (Artilce info + connexion selection) */}

                                        {
                                            articleE.id === 1
                                            ? <div>Pas de résultats</div>
                                            :
                                            <>
                                             {
                                                articleE.id != 1 && articleE.id != 0 &&

                                                <div className="flex flex-col items-start w-full">
                                                    {/* Article label */}
                                                    <p className="px-2 w-full py-1 rounded-t-[5px] bg-blue-dark text-white text-lg">{articleE.label}</p>
                                                    
                                                    {/* List of connexions */}
                                                    <table className="w-full border-collapse">
                                                        <tbody>
                                                            {articleE.connexions.map((conn, index) => {
                                                            const isSelected = articleE.selectedPortIndex === index

                                                            return (
                                                                <tr
                                                                key={index}
                                                                onClick={() =>
                                                                    dispatchAE({ type: "SET_SELECTED_PORT", payload: index })
                                                                }
                                                                className={clsx(
                                                                    "cursor-pointer transition-colors",
                                                                    "hover:bg-blue-50",
                                                                    isSelected && "bg-blue-100"
                                                                )}
                                                                >
                                                                {/* Sélection */}
                                                                <td className="w-6 px-1 text-center font-semibold text-blue-600">
                                                                    {isSelected ? "Arrivée" : ""}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200">
                                                                    {conn.port}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.material}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.type}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.diam}
                                                                </td>

                                                                <td className="px-3 py-1 border-b border-gray-200 text-gray-700">
                                                                    {conn.sexe}
                                                                </td>
                                                                </tr>
                                                            )
                                                            })}
                                                        </tbody>
                                                    </table>

                                                    
                                                </div>
                                             }
                                            </>
                                        }

                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    
                    <div className="border-r-1 border-blue-dark/10 px-3 flex items-end">
                        <div className="ms-auto p-2 bg-blue-primary rounded-xl cursor-pointer flex items-center justify-center w-[40px] h-[40px]" onClick={()=>{if(!loading){findPath()}}}>
                            {
                                loading 
                                ? <CircularLoader size={20} strokeWidth={2} speed={2} className="text-white flex-1" />
                                :   <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 512 512"><path fill="white" d="m280.16 242.79l-26.11-26.12a32 32 0 0 0-45.14-.12L27.38 384.08c-6.61 6.23-10.95 14.17-11.35 23.06a32.1 32.1 0 0 0 9.21 23.94l39 39.43a.5.5 0 0 0 .07.07A32.3 32.3 0 0 0 87 480h1.18c8.89-.33 16.85-4.5 23.17-11.17l168.7-180.7a32 32 0 0 0 .11-45.34M490 190l-.31-.31l-34.27-33.92a21.46 21.46 0 0 0-15.28-6.26a21.9 21.9 0 0 0-12.79 4.14c0-.43.06-.85.09-1.22c.45-6.5 1.15-16.32-5.2-25.22a258 258 0 0 0-24.8-28.74a.6.6 0 0 0-.08-.08c-13.32-13.12-42.31-37.83-86.72-55.94A139.6 139.6 0 0 0 257.56 32C226 32 202 46.24 192.81 54.68a120 120 0 0 0-14.18 16.22a16 16 0 0 0 18.65 24.34a75 75 0 0 1 8.58-2.63a63.5 63.5 0 0 1 18.45-1.15c13.19 1.09 28.79 7.64 35.69 13.09c11.7 9.41 17.33 22.09 18.26 41.09c.18 3.82-7.72 18.14-20 34.48a16 16 0 0 0 1.45 21l34.41 34.41a16 16 0 0 0 22 .62c9.73-8.69 24.55-21.79 29.73-25c7.69-4.73 13.19-5.64 14.7-5.8a19.2 19.2 0 0 1 11.29 2.38a1.24 1.24 0 0 1-.31.95l-1.82 1.73l-.3.28a21.52 21.52 0 0 0 .05 30.54l34.26 33.91a21.45 21.45 0 0 0 15.28 6.25a21.7 21.7 0 0 0 15.22-6.2l55.5-54.82c.19-.19.38-.39.56-.59A21.87 21.87 0 0 0 490 190"/></svg>
                            }
                            
                        </div>
                    </div>
                    {/* Log side (right) */}
                    <div className="w-[30%] flex flex-col">
                        {
                            logs.map(log => (
                                <div className="flex justify-start items-center gap-2 py-1 px-2">
                                    {
                                        log.state === "loading" && <CircularLoader size={20} className="stroke-blue-primary"></CircularLoader>
                                    }
                                    {
                                        log.state === "failure" && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><path className="fill-red-primary" fill-rule="evenodd" d="M44 24c0 11.046-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4s20 8.954 20 20m-27.778 7.778a1 1 0 0 1 0-1.414L22.586 24l-6.364-6.364a1 1 0 0 1 1.414-1.414L24 22.586l6.364-6.364a1 1 0 0 1 1.414 1.414L25.414 24l6.364 6.364a1 1 0 0 1-1.414 1.414L24 25.414l-6.364 6.364a1 1 0 0 1-1.414 0" clip-rule="evenodd"/></svg>
                                    }
                                    {
                                        log.state === "success" && <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 1024 1024"><path className="fill-green-500" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg>
                                    }
                                    <p>{log.message}</p>
                                </div>
                            ))
                        }
                    </div>
                    
                </div>
                
                {/* separator */}
                <div className="w-full flex items-center gap-3">
                    <div className="h-[1px] bg-blue-primary/20 w-full"></div>
                    
                    <svg onClick={()=>setShowSelection(!showSelecion)} className={clsx("fill-blue-primary rotate-90 cursor-pointer", !showSelecion && "rotate-270")} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M12.727 3.687a1 1 0 1 0-1.454-1.374l-8.5 9a1 1 0 0 0 0 1.374l8.5 9.001a1 1 0 1 0 1.454-1.373L4.875 12z"/></svg>
                    
                </div>

                {/* Down section */}
                <div className="flex-1 flex flex-col min-h-0 overflow-auto">

                        {/* Switch path */}
                        {
                            paths.length > 0 &&
                            
                            <MontageResult paths={paths} pathIndex={pathIndex} setPathIndex={setPathIndex}></MontageResult>
                           
                        }
                        
                </div>
            </div>

        </>
    )
}