import { useEffect, useReducer, useState } from "react";
import { getProductData, type ProductEntry } from "../scripts/sheetService";
import LabelPdfButton from "../components/utils/LabelPdfButton";

type Item = {id: number, code: string, name: string};

type Action = 
    | {type: "ADD"; payload: Item}
    | {type: "REMOVE"; payload: number}
    | {type: "UPDATE"; payload: Item}

function reducer(state: Item[], action: Action): Item[]{
    switch(action.type){
        case "ADD":
            return [...state, action.payload];
        case "REMOVE":
            return state.filter(i => i.id !== action.payload);
        case "UPDATE":
            return state.map(i => (i.id === action.payload.id ? action.payload : i));
        default:
            return state;
    }
}

export default function TcodePage(){


    const [items, dispatch] = useReducer(reducer, [{id:1, code:"", name:""}]);

    // DATA FOR ZONES
    const [data, setData] = useState<ProductEntry[] | null>(null);

    const handleOnKeyDownCode = (e: React.KeyboardEvent<HTMLInputElement>, item: Item) => {
        if (e.key === "Tab"){
            console.log("tab pour : ", item.id)
            
            // Check in data to replace name
            if(data){
                 const code_designation = data.filter(art => art.ref === item.code)[0];
                 if(code_designation){
                    dispatch({type:"UPDATE", payload: {...item, name: code_designation.label}})
                 }
                 
            }
           
        }
    }

    const handleNewItem = () =>{
        const lastItem = items.at(-1)?.id;
        const newId = lastItem ? lastItem + 1 : 1 

        dispatch({type:"ADD", payload: {id: newId, code: "", name:""}})

    }

    // get data (from sheet/cache)
    useEffect(() => {
        getProductData()
        .then((res) => setData(res))
        .catch((err) => {
            console.error(err);
            console.log("Erreur lors du chargement des données.")
        })
    }, []);


    return(
        <div className="h-full flex flex-col pt-2">

            <div className=" flex-1 flex flex-col items-center overflow-auto">

                {/* header */}
                <div className="w-[700px] flex gap-2 bg-blue-dark text-white font-semibold text-xl select-none">
                    <p className="w-[200px] py-1 text-center">Code article</p>
                    <div className="w-[1px] bg-white"></div>
                    <p className="flex-1 py-1 text-center">Désignation</p>
                </div>

                {/* Content */}
                <div className=" flex-1 overflow-auto flex flex-col gap-2 pt-2">
                    {/* ERxemple */}

                    {
                        items.map(item => (
                            <div className="w-[700px] flex items-center gap-4">
                                {/* CODE */}
                                <input 
                                    onKeyDown={(e)=> handleOnKeyDownCode(e, item)}
                                    value={item.code} 
                                    onChange={e => 
                                        dispatch({
                                            type: "UPDATE",
                                            payload: {...item, code: e.target.value.toUpperCase()}
                                        })
                                    } 
                                    className="border-2 border-blue-dark rounded-md w-[200px] p-1 text-center" type="text" />

                                {/* NAME */}
                                <input 
                                    value={item.name} 
                                    onChange={e => 
                                        dispatch({
                                            type: "UPDATE",
                                            payload: {...item, name: e.target.value}
                                        })
                                    }
                                    className="border-2 border-blue-dark rounded-md flex-1 p-1" type="text" />
                                    
                                    <div onClick={()=>dispatch({type:"REMOVE", payload: item.id})}>
                                        <svg className="fill-red-500 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"/></svg>
                                    </div>
                            </div>
                        ))
                    }
                    
        
                    <div  className=" text-white flex flex-col items-center">
                        <svg onClick={()=>handleNewItem()} className="fill-blue-dark cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path  fill-rule="evenodd" d="M7.345 4.017a42.3 42.3 0 0 1 9.31 0c1.713.192 3.095 1.541 3.296 3.26a40.7 40.7 0 0 1 0 9.446c-.201 1.719-1.583 3.068-3.296 3.26a42.3 42.3 0 0 1-9.31 0c-1.713-.192-3.095-1.541-3.296-3.26a40.7 40.7 0 0 1 0-9.445a3.734 3.734 0 0 1 3.295-3.26M12 7.007a.75.75 0 0 1 .75.75v3.493h3.493a.75.75 0 1 1 0 1.5H12.75v3.493a.75.75 0 0 1-1.5 0V12.75H7.757a.75.75 0 0 1 0-1.5h3.493V7.757a.75.75 0 0 1 .75-.75" clip-rule="evenodd"/></svg>
                    </div>

                </div>
              
              </div>

            {/* Footer */}
            <div className="bg-blue-dark flex flex-col items-center p-2 select-none">

                <LabelPdfButton items={items} filename="etiquettes-articles.pdf"></LabelPdfButton>
            </div>
        </div>
    )
}