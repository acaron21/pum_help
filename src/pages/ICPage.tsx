import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ICCard from "../components/ICCard";


export type IC = {
    ic: number;
    imgs:string[];
    name: string;
    content: string[];
    dialects: string;
    key_words: string[];
}

const ICs: IC[] = [
    {
    ic: 845,
    imgs: ["ic/845_tampon_fonte_250.webp", "ic/845_grille_fonte_250.webp"],
    name: "Fonte lourde B250",
    content: ["Couvercle fonte B250", "Grille fonte B250"],
    dialects: "tampon, grille plate, fonte lourde, tampon routier, grille routière",
    key_words: [
        "fonte", "lourde", "B250",
        "tampon", "grille", "couvercle",
        "tampon fonte", "grille fonte",
        "tampon B250", "grille B250",
        "tampon lourd", "grille lourde",
        "voirie", "routier", "route",
        "tampon routier", "grille routière",
        "tampon voirie", "grille voirie",
        "couvercle fonte", "regard fonte", "regard B250"
    ]
    },
    {
    ic: 137,
    imgs: ["ic/137_tampon_fonte_125.webp", "ic/137_grille_fonte_125.webp"],
    name: "Fonte légère B125",
    content: ["Couvercle fonte B125", "Grilles fonte B125"],
    dialects: "tampon, grille plate, trottoir",
    key_words: ["fonte", "legere", "légère", "B125", "tampon", "grille", "grille fonte", "tampon fonte", "trottoir", "voirie", "couvercle", "tampon léger", "tampon B125"]
    },
    {
        ic: 842,
        imgs: ["ic/842_chambre.webp"],
        name: "Chambre télécom",
        content: ["L0T", "L1T", "L2T", "L3T", "L4T"],
        dialects: "chambre tirage, chambre telecom, chambre téléphonique",
        key_words: ["chambre", "telecom", "télécom", "tirage", "passage", "fourreau", "telephonique", "téléphonique", "regard telecom", "regard télécom"]
    },
    {
        ic: 144,
        imgs: ["ic/144_cardre_fonte.webp"],
        name: "Cadre et tampon",
        content: ["Cadre fonte", "Couvercle fonte"],
        dialects: "tampon, cadre fonte, tampon fonte",
        key_words: ["cadre", "tampon", "fonte", "couvercle", "tampon fonte", "cadre tampon"]
    },
    {
        ic: 133,
        imgs: ["ic/133_batidrain.webp"],
        name: "Drainage",
        content: ["Batidrain", "Delta MS"],
        dialects: "MS, delta",
        key_words: ["drainage", "batidrain", "delta", "MS", "membrane", "etancheite", "étanchéité"]
    },
    {
        ic: 81,
        imgs: ["ic/81_geo.webp"],
        name: "Géotextile",
        content: ["Géotextile"],
        dialects: "bidime",
        key_words: ["géotextile", "geotextile", "bidime", "tissu", "filtrant", "nappe"]
    },
    {
        ic: 67,
        imgs: ["ic/67_tpc_rouge.webp", "ic/67_tpc_vert.webp", "ic/67_tpc_bleu.webp"],
        name: "Couronnes TPC",
        content: ["TPC rouge", "TPC bleu", "TPC vert"],
        dialects: "TPC",
        key_words: ["TPC", "couronne", "gaine", "fourreau", "rouge", "bleu", "vert", "protection cable", "protection câble"]
    },
    {
        ic: 68,
        imgs: ["ic/68_icta.webp", "ic/68_double_parroie.webp"],
        name: "Gaines électriques",
        content: ["ICTA", "double paroi", "Saint-Ro"],
        dialects: "gaine, ICTA, double paroi, saintro",
        key_words: ["gaine", "electrique", "électrique", "ICTA", "double paroi", "saintro", "saint-ro", "tube électrique"]
    },
    {
        ic: 72,
        imgs: ["ic/72_can_pvc.webp"],
        name: "Canniveaux plastique",
        content: ["Fond", "Grilles"],
        dialects: "canniveau pvc, grille pvc",
        key_words: ["canniveau", "caniveau", "plastique", "pvc", "grille", "fond", "caniveau pvc"]
    },
    {
        ic: 132,
        imgs: ["ic/132_can_fonte.webp"],
        name: "Canniveaux fonte",
        content: ["Fond", "Grilles"],
        dialects: "caniveau fonte, grille fonte",
        key_words: ["canniveau", "caniveau", "fonte", "grille", "fond", "caniveau fonte"]
    },
    {
        ic: 33,
        imgs: ["ic/33_tabouret.webp"],
        name: "Tabourets",
        content: ["Tabourets"],
        dialects: "tabouret de passage",
        key_words: ["tabouret", "passage", "regard", "tabouret passage"]
    },
    {
        ic: 2798,
        imgs: ["ic/2798_beton.webp"],
        name: "Béton",
        content: ["Sac béton", "Sac mortier"],
        dialects: "sac béton, sac mortier",
        key_words: ["béton", "beton", "mortier", "sac beton", "sac mortier", "ciment"]
    },
    {
        ic: 2766,
        imgs: ["ic/2766_cr8.webp"],
        name: "Tube CR4/CR8",
        content: ["Tubes"],
        dialects: "assainissement, CR4, CR8",
        key_words: ["tube", "CR4", "CR8", "assainissement", "evacuation", "évacuation"]
    },
    {
        ic: 2763,
        imgs: ["ic/2763_tube_epandage.webp"],
        name: "Tube d'épandage",
        content: ["Tubes"],
        dialects: "épandage, irrigation",
        key_words: ["tube", "epandage", "épandage", "irrigation", "assainissement", "drainage"]
    },
    {
        ic: 108,
        imgs: ["ic/108_tube_multi.webp", "ic/108_cour_multi.webp"],
        name: "Multi-couche",
        content: ["Tube", "Couronnes"],
        dialects: "multicouche, tube multicouche",
        key_words: ["multicouche", "tube", "couronne", "plomberie", "chauffage"]
    },
    {
        ic: 63,
        imgs: ["ic/63_drain_agri.webp"],
        name: "Drain agricole",
        content: ["Couronnes drain agricoles"],
        dialects: "drain jaune, agricole",
        key_words: ["drain", "agricole", "couronne", "jaune", "drainage", "evacuation", "évacuation"]
    },
    {
        ic: 21,
        imgs: ["ic/21_tete_BAC.webp"],
        name: "Tête bouche à clé",
        content: [],
        dialects: "BAC, bouche à clé",
        key_words: ["tête", "bouche", "clé", "BAC", "tete BAC", "regard BAC"]
    },
]


export default function ICPage(){
    const [searchInput, setSearchInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [filteredIC, setFilteredIC] = useState<IC[]>([])
    

    
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const searchTerms = searchInput.toLowerCase().trim().split(/\s+/);

            const newFiltered = ICs.filter(ic =>
            searchTerms.every(term =>
                ic.key_words.some(keyword => keyword.toLowerCase().startsWith(term))
            )
            );

            setFilteredIC(newFiltered);

        }, 300); // délai de debounce en ms

        return () => clearTimeout(delayDebounce);
    }, [searchInput]);
    
    return(
        <div className="flex flex-col h-full">
            {/* Research */}
                <div className="flex flex-row justify-center sticky top-0 w-full bg-white p-4">
                    <div className="flex items-center gap-2 bg-blue-light p-3 rounded-[50px] md:w-[70%] w-full">
                        <svg className={clsx("transition duration-300", (searchInput !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                        <input ref={inputRef} value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} className="flex-1 outline-0 text-xl" type="text" placeholder="Rechercher (contenu de l'IC, nom, produit, ...)"/>
                        
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

                <div className="flex-1 flex flex-col gap-3 overflow-auto px-1 md:px-8">
                        {filteredIC.map(ic=>(
                            <ICCard key={ic.ic}
                            {...ic}
                            ></ICCard>
                        ))}
                </div>
        </div>
    )
}