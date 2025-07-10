import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ICCard from "../components/ICCard";



export type IC = {
    ic: number;
    imgs: string[];
    name: string;
    content: string[];
    dialects: string;
    key_words: string[];
    comment: string;
};

const ICs: IC[] = [
    {
        ic: 117,
        imgs: ["ic/117_tube_pvc.webp"],
        name: "Tube PVC",
        content: ["Tubes PVC évacuation", "Tubes PVC blanc"],
        dialects: "",
        key_words: [
            "tube", "pvc"
        ],
        comment: ``
    },
    {
        ic: 67,
        imgs: ["ic/67_tpc_rouge.webp", "ic/67_tpc_vert.webp", "ic/67_tpc_bleu.webp"],
        name: "Couronnes TPC",
        content: ["TPC rouge", "TPC bleu", "TPC vert"],
        dialects: "TPC",
        key_words: ["TPC", "couronne", "gaine", "fourreau", "rouge", "bleu", "vert", "protection cable", "protection câble"],
        comment: ""
    },
        {
        ic: 116,
        imgs: ["ic/116_cour_pe.webp"],
        name: "Couronnes PE",
        content: ["Couronnes PE"],
        dialects: "PE, couronne PE",
        key_words: ["couronne", "PE", "couronne PE", "polyethylene", "polyéthylène"],
        comment: ""
    },
    {
        ic: 843,
        imgs: ["ic/843_fond.webp", "ic/843_rehausse.webp", "ic/843_couvercle.webp"],
        name: "Regard béton",
        content: ["Fond de boîte", "Réhausse", "Couvercle"],
        dialects: "boite béton, regard pluvial, Boisseaux, Parcellaires",
        key_words: [
            "regard", "béton", "beton", "boite", "boîte",
            "pluvial", "réhausse", "rehausse",
            "couvercle", "tampon", "opercule",
            "regard béton", "regard pluvial", "regard assainissement",
            "regard telecom", "regard télécom", "boite regard",
            "fond de boite", "fond de boîte", "boisseaux"
        ],
        comment: `Diamètre exprimé dans sage pour les regards/couvercles bétons: intérieur`
    },
    {
        ic: 845,
        imgs: ["ic/845_tampon_fonte_250.webp", "ic/845_grille_fonte_250.webp", "ic/845_avaloir.webp"],
        name: "Fonte lourde B250",
        content: ["Couvercle fonte B250", "Grille fonte B250", "Avaloir"],
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
            "couvercle fonte", "regard fonte", "regard B250",
            "tgas", "avaloir",
        ],
        comment: ""
    },
    {
        ic: 137,
        imgs: ["ic/137_tampon_fonte_125.webp", "ic/137_grille_fonte_125.webp"],
        name: "Fonte légère B125",
        content: ["Couvercle fonte B125", "Grilles fonte B125"],
        dialects: "tampon, grille plate, trottoir",
        key_words: ["fonte", "legere", "légère", "B125", "tampon", "grille", "grille fonte", "tampon fonte", "trottoir", "voirie", "couvercle", "tampon léger", "tampon B125"],
        comment: ""
    },
    {
        ic: 842,
        imgs: ["ic/842_chambre.webp"],
        name: "Chambre télécom",
        content: ["L0T", "L1T", "L2T", "..."],
        dialects: "chambre tirage, chambre telecom, chambre téléphonique",
        key_words: ["chambre", "telecom", "télécom", "tirage", "passage", "fourreau", "telephonique", "téléphonique"],
        comment: ""
    },
    {
        ic: 144,
        imgs: ["ic/144_cardre_fonte.webp"],
        name: "Cadre et tampon",
        content: ["Cadre fonte", "Couvercle fonte"],
        dialects: "tampon, cadre fonte, tampon fonte",
        key_words: ["cadre", "tampon", "fonte", "couvercle", "tampon fonte", "cadre tampon"],
        comment: ""
    },
    {
        ic: 133,
        imgs: ["ic/133_batidrain.webp"],
        name: "Drainage",
        content: ["Batidrain", "Delta MS"],
        dialects: "MS, delta",
        key_words: ["drainage", "batidrain", "delta", "MS", "membrane", "etancheite", "étanchéité"],
        comment: ""
    },
    {
        ic: 81,
        imgs: ["ic/81_geo.webp"],
        name: "Géotextile",
        content: ["Géotextile"],
        dialects: "bidime",
        key_words: ["géotextile", "geotextile", "bidime", "tissu", "filtrant", "nappe"],
        comment: ""
    },
    {
        ic: 68,
        imgs: ["ic/68_icta.webp", "ic/68_double_parroie.webp"],
        name: "Gaines électriques/Sanitaire",
        content: ["ICTA", "double paroi","Sanitaire", "Saint-Ro"],
        dialects: "gaine, ICTA, double paroi, saintro",
        key_words: ["sanitaire", "gaine", "electrique", "électrique", "ICTA", "double paroi", "saintro", "saint-ro", "tube électrique"],
        comment: ""
    },
    {
        ic: 72,
        imgs: ["ic/72_can_pvc.webp"],
        name: "Canniveaux plastique",
        content: ["Fond", "Grilles"],
        dialects: "canniveau pvc, grille pvc",
        key_words: ["canniveau", "caniveau", "plastique", "pvc", "grille", "fond", "caniveau pvc"],
        comment: ""
    },
    {
        ic: 132,
        imgs: ["ic/132_can_fonte.webp"],
        name: "Canniveaux fonte",
        content: ["Fond", "Grilles"],
        dialects: "caniveau fonte, grille fonte",
        key_words: ["canniveau", "caniveau", "fonte", "grille", "fond", "caniveau fonte"],
        comment: ""
    },
    {
        ic: 33,
        imgs: ["ic/33_tabouret.webp"],
        name: "Tabourets",
        content: ["Tabourets"],
        dialects: "tabouret de passage",
        key_words: ["tabouret", "passage", "regard", "tabouret passage"],
        comment: ""
    },
    {
        ic: 2798,
        imgs: ["ic/2798_beton.webp"],
        name: "Béton",
        content: ["Sac béton", "Sac mortier"],
        dialects: "sac béton, sac mortier",
        key_words: ["béton", "beton", "mortier", "sac beton", "sac mortier", "ciment"],
        comment: ""
    },
    {
        ic: 2766,
        imgs: ["ic/2766_cr8.webp"],
        name: "Tube CR4/CR8",
        content: ["Tubes"],
        dialects: "assainissement, CR4, CR8",
        key_words: ["tube", "CR4", "CR8", "assainissement", "evacuation", "évacuation"],
        comment: ""
    },
    {
        ic: 2763,
        imgs: ["ic/2763_tube_epandage.webp"],
        name: "Tube d'épandage",
        content: ["Tubes"],
        dialects: "épandage, irrigation",
        key_words: ["tube", "epandage", "épandage", "irrigation", "assainissement", "drainage"],
        comment: ""
    },
    {
        ic: 108,
        imgs: ["ic/108_tube_multi.webp", "ic/108_cour_multi.webp"],
        name: "Multi-couche",
        content: ["Tube", "Couronnes"],
        dialects: "multicouche, tube multicouche",
        key_words: ["multicouche", "tube", "couronne", "plomberie", "chauffage"],
        comment: ""
    },
    {
        ic: 63,
        imgs: ["ic/63_drain_agri.webp"],
        name: "Drain agricole",
        content: ["Couronnes drain agricoles"],
        dialects: "drain jaune, agricole",
        key_words: ["drain", "agricole", "couronne", "jaune", "drainage", "evacuation", "évacuation"],
        comment: ""
    },
    {
        ic: 21,
        imgs: ["ic/21_tete_BAC.webp"],
        name: "Tête bouche à clé",
        content: [],
        dialects: "BAC, bouche à clé",
        key_words: ["tête", "bouche", "clé", "BAC", "tete BAC", "regard BAC"],
        comment: ""
    },
    {
        ic: 1272,
        imgs: ["ic/1272_boite_bleue.webp"],
        name: "Boîte plancher",
        content: ["Boite bleue"],
        dialects: "boite bleue, plancher, boite plancher",
        key_words: ["boite", "boîte", "plancher", "boite bleue", "boite plancher", "bleue"],
        comment: ""
    },
    {
        ic: 1372,
        imgs: ["ic/1372_couvercle_composite.webp"],
        name: "Couvercle Composite",
        content: [],
        dialects: "couvercle plastique",
        key_words: ["couvercle", "plastique","composite","regard", "couvercle plastique"],
        comment: "Couvercle composite pour regard béton"
    },
    {
        ic: 73,
        imgs: ["ic/73_fosse.webp"],
        name: "Fosses/Micro-station",
        content: [],
        dialects: "fosse, microstation, micro-station",
        key_words: ["fosse", "microstation", "micro-station", "assainissement", "epuration", "épuration"],
        comment: ""
    },
    {
        ic: 907,
        imgs: ["ic/907_isolant.webp"],
        name: "Isolant",
        content: [],
        dialects: "isolant, isolation",
        key_words: ["isolant", "isolation", "panneau isolant", "rouleau isolant"],
        comment: ""
    },
    {
        ic: 146,
        imgs: ["ic/146_cuve_EP.webp"],
        name: "Cuve EP",
        content: [],
        dialects: "cuve EP, eau pluviale",
        key_words: ["cuve", "EP", "eau pluviale", "cuve EP", "cuve pluviale", "recuperation eau"],
        comment: ""
    },
    {
        ic: 77,
        imgs: ["ic/77_pompe_relevage.webp"],
        name: "Pompe domestique/relevage",
        content: [],
        dialects: "pompe domestique, pompe relevage",
        key_words: ["pompe", "domestique", "relevage", "pompe relevage", "pompe domestique"],
        comment: ""
    },
    {
        ic: 908,
        imgs: ["ic/xxx.webp"],
        name: "Touret rac plt",
        content: [],
        dialects: "gaz",
        key_words: ["touret", "rac plt", "gaz", "relevage", "touret gaz"],
        comment: ""
    },
    {
        ic: 69,
        imgs: ["ic/xxx.webp"],
        name: "Rac télécom",
        content: [],
        dialects: "raccord telecom, raccord télécom",
        key_words: ["rac", "raccord", "telecom", "télécom", "raccord telecom", "raccord télécom"],
        comment: ""
    },
    {
        ic: 59,
        imgs: ["ic/59_ccv.webp"],
        name: "Niches à eaux",
        content: ["CCV", "regard compteur"],
        dialects: "niche eau, CCV, regard compteur",
        key_words: ["niche", "eau", "niche eau", "regard", "compteur", "CCV", "regard compteur"],
        comment: ""
    },

    {
        ic: 1161,
        imgs: ["ic/1161_tube_pe.webp"],
        name: "Tubes PE",
        content: ["tubes"],
        dialects: "tube PE",
        key_words: ["tube", "PE", "tube PE", "polyethylene", "polyéthylène", "tuyau PE"],
        comment: ""
    },
    {
        ic: 60,
        imgs: ["ic/60_cour_per.webp", "ic/PER_img1.webp"],
        name: "PER",
        content: ["Couronnes PER nues", "Couronnes PER pré-gainées"],
        dialects: "PER, couronne PER",
        key_words: ["PER", "couronne", "couronne PER", "tube PER", "couronne pre-gainee", "pré-gainée"],
        comment: ""
    },
    {
        ic: 78,
        imgs: ["ic/78_sous_dalle.webp"],
        name: "Sous Dalle",
        content: ["Sous dalle", "Polyane", "Bache de protection"],
        dialects: "sous dalle, polyane, bâche",
        key_words: ["sous dalle", "polyane", "bache", "bâche", "protection", "film plastique"],
        comment: ""
    },
    {
        ic: 2891,
        imgs: ["ic/xxx.webp"],
        name: "Tête de sécurités",
        content: ["Tête réhaussable"],
        dialects: "tete securite, tete rehaussable",
        key_words: ["tete", "tête", "securite", "sécurité", "tete securite", "tete rehaussable", "réhaussable"],
        comment: ""
    },
    {
        ic: 122,
        imgs: ["ic/122_conteneur_grillage.webp"],
        name: "Conteneur Grillagé",
        content: [],
        dialects: "conteneur grillagé",
        key_words: ["conteneur", "grillage", "grillagé", "conteneur grillagé", "poubelle grillagée"],
        comment: ""
    },
    {
        ic: 922,
        imgs: ["ic/xxx.webp"],
        name: "Consommables",
        content: [],
        dialects: "consommables",
        key_words: ["consommable", "consommables", "usage chantier"],
        comment: ""
    },
    {
        ic: 905,
        imgs: ["ic/905_fonte_smu_rouge.webp", "ic/905_fonte_smu_gris.webp"],
        name: "Fonte SMU",
        content: ["Raccord fonte grise", "Raccords fonte rouge"],
        dialects: "fonte SMU, raccord SMU",
        key_words: ["fonte", "SMU", "fonte SMU", "raccord", "raccord fonte", "raccord SMU"],
        comment: ""
    },
    {
        ic: 88,
        imgs: ["ic/xxx.webp"],
        name: "PE irrigation",
        content: [],
        dialects: "PE irrigation",
        key_words: ["PE", "irrigation", "PE irrigation", "tube irrigation"],
        comment: ""
    },
    {
        ic: 323,
        imgs: ["ic/323_racc_ecopal1.webp", "ic/323_racc_ecopal2.webp"],
        name: "Raccords annelé ECOPAL",
        content: [],
        dialects: "ecopal, raccord annelé",
        key_words: ["raccord", "annelé", "ecopal", "raccord ecopal", "raccord annelé"],
        comment: ""
    },
    {
        ic: 841,
        imgs: ["ic/841_rehausse_chambre_telecom.webp"],
        name: "Réhausse Chambre télécom",
        content: [],
        dialects: "rehausse chambre telecom, réhausse chambre télécom",
        key_words: ["rehausse", "réhausse", "chambre", "telecom", "télécom", "rehausse telecom", "réhausse télécom"],
        comment: ""
    },
];



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
        <div className="flex flex-col h-full bg-blue-light">
            {/* Research */}
                <div className="flex flex-row justify-center top-0 w-full bg-white backdrop-blur-md p-4">
                    <div className="flex items-center gap-2 bg-blue-light p-3 rounded-[50px] md:w-[40%] w-full">
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
                        
                <div className="flex-1 flex flex-col gap-3 overflow-auto px-1 md:px-8 md:py-3">
                        {filteredIC.map(ic=>(
                            <ICCard key={ic.ic}
                            {...ic}
                            ></ICCard>
                        ))}
                </div>
        </div>
    )
}