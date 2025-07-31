import { useEffect, useRef, useState } from "react";
import ArticleCard from "../components/ArticleCard"
import MainPlan from "../components/plan/MainPlan"
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { getProductData, refreshProductData } from "../scripts/sheetService";
import type { ProductEntry } from "../scripts/sheetService";


type Article = {
  id: number;
  img: string;
  zones: number[];
  key_words: string[];
};

const articles: Article[] = [
{ id: 1, img: "1_isiflo.webp", zones: [27], key_words: ["isiflo", "raccord", "laiton", "pe", "serrage", "jaune"] },
{ id: 2, img: "2_racc_bleu.webp", zones: [28, 9], key_words: ["pe", "bleu", "raccord", "serrage", "plastique"] },
{ id: 3, img: "3_manchon_elasto.webp", zones: [29], key_words: ["manchon", "reparation", "noir", "caoutchouc", "serrage", "norham", "elastomère", "élastomère"] },
{ id: 4, img: "4_mamellon_isiflo.webp", zones: [26,10], key_words: ["mamelon", "jaune", "laiton", "réduction", "reduction", "isiflo", "bouchon", "raccord"] },
{ id: 5, img: "5_electrosoudable.webp", zones: [30], key_words: ["éléctrosoudable", "gris", "noir", "electro", "électro", "pe", "manchon", "raccord"] },
{ id: 6, img: "6_joint_bride.webp", zones: [25], key_words: ["joint", "fonte", "bride", "bleu"] },
{ id: 7, img: "7_pompe_relevage.webp", zones: [23, 103], key_words: ["pompe", "relevage", "eau", "nova", "vide", "cave", "vert"] },
{ id: 8, img: "8_regard_pvc.webp", zones: [21], key_words: ["regard", "pvc", "plastique", "fond", "couvercle", "gris"] },
{ id: 9, img: "9_caniveaux_pvc.webp", zones: [21, 113], key_words: ["caniveaux", "grille", "pvc", "plastique", "gris", "beige", "sable"] },
{ id: 10, img: "10_ventilation.webp", zones: [2,103], key_words: ["ventilation", "grille", "blanc", "gris", "beige", "aération", "aeration"] },
{ id: 11, img: "11_raccord_pvc_gouttiere.webp", zones: [3,113], key_words: ["pvc", "gouttière", "blanc", "sable", "beige", "gris", "anthracite", "gouttiere", "raccord", "exterieur", "extérieur"] },
{ id: 12, img: "12_robinet_fonte.webp", zones: [31], key_words: ["robinet", "fonte", "huot", "bleu"] },
{ id: 13, img: "13_bride_huot.webp", zones: [35,104], key_words: ["bride", "huot", "bleu"] },
{ id: 14, img: "14_collier_huot.webp", zones: [32], key_words: ["collier", "bride", "huot", "fonte", "bleu"] },
{ id: 15, img: "15_geotextile.webp", zones: [36], key_words: ["geo", "textile", "geotextile", "géotextile", "gris"] },
{ id: 16, img: "16_raccord_huot_fonte.webp", zones: [33, 104], key_words: ["raccord", "huot", "fonte", "lourd", "bleu"] },
{ id: 17, img: "17_racc_per.webp", zones: [66], key_words: ["per", "raccord", "sertir", "gris"] },
{ id: 18, img: "18_sable.webp", zones: [37], key_words: ["sable"] },
{ id: 19, img: "19_traceur.webp", zones: [46, 133], key_words: ["traceur", "fluo", "marqueur", "chantier"] },
{ id: 20, img: "20_scotch.webp", zones: [45,133], key_words: ["scotch", "orange"] },
{ id: 21, img: "21_piscine.webp", zones: [1], key_words: ["piscine", "skimmer", "filtre"] },
{ id: 22, img: "22_robinet_piscine.webp", zones: [15, 13], key_words: ["vanne", "robinet", "piscine", "pression", "gris", "bleu", "rouge"] },
{ id: 23, img: "23_tuyau_piscine.webp", zones: [20], key_words: ["tuyau", "goutte", "piscine", "arrosage", "noir", "marron"] },
{ id: 24, img: "24_raccord_piscine.webp", zones: [15, 14 ,16, 126, 128], key_words: ["raccord", "piscine", "pression", "gris"] },
{ id: 25, img: "25_visserie.webp", zones: [87], key_words: ["vis", "viserie", "cheville"] },
{ id: 26, img: "26_collier_pvc_gris.webp", zones: [85], key_words: ["collier", "pvc", "gris"] },
{ id: 27, img: "27_collier_pvc_noir.webp", zones: [85], key_words: ["collier", "pvc", "noir"] },
{ id: 28, img: "28_collier_iso.webp", zones: [83, 103], key_words: ["collier", "iso", "isophonique", "joint", "serrage", "noir", "gris"] },
{ id: 29, img: "29_collier_pvc_lg.webp", zones: [86], key_words: ["collier", "pvc", "gris", "tube", "serrage"] },
{ id: 30, img: "30_collier_metal.webp", zones: [83, 103], key_words: ["collier", "métal", "métal", "boite", "serrage", "gris"] },
{ id: 31, img: "31_rail_t.webp", zones: [84, 103], key_words: ["rail", "t", "métal", "gris"] },
{ id: 32, img: "32_rouleau_metal_serrage.webp", zones: [84, 103], key_words: ["métal", "rouleau", "rouleaux", "serrage", "gris"] },
{ id: 33, img: "33_outillage.webp", zones: [88, 89], key_words: ["marteau", "tournevis", "outils", "outillage", "scie", "lame", "meche", "mèche"] },
{ id: 34, img: "34_colle.webp", zones: [79, 55, 133,136,137], key_words: ["colle", "bleu", "rouge"] },
{ id: 35, img: "35_rouleau_abrasif.webp", zones: [55], key_words: ["papier", "poncage", "ponçage", "abrasif", "rouleau", "gris"] },
{ id: 36, img: "36_pipe_mal.webp", zones: [56], key_words: ["siphon", "machine","a", "à", "laver", "gris"] },
{ id: 37, img: "37_pipe.webp", zones: [78], key_words: ["pipe", "wc", "toilettes", "pvc", "blanc", "blanc"] },
{ id: 38, img: "38_flexible.webp", zones: [77], key_words: ["flexible", "raccord", "souple", "gris", "gris"] },
{ id: 39, img: "39_reduction_metal_plastique.webp", zones: [57], key_words: ["raccord", "caoutchouc", "plastique", "noir"] },
{ id: 40, img: "40_siphon.webp", zones: [56], key_words: ["siphon", "wc", "toilettes", "gris", "blanc"] },
{ id: 41, img: "41_raccord_arrosage.webp", zones: [19, 103], key_words: ["raccord", "arrosage", "plastique", "noir"] },
{ id: 42, img: "42_raccord_arrosage_laiton.webp", zones: [47], key_words: ["raccord", "laiton", "arrosage", "jaune"] },
{ id: 43, img: "43_epi.webp", zones: [81], key_words: ["epi", "protection", "équipement", "equipement", "casque", "gants", "chaussures", "sécurité", "lunettes"] },
{ id: 44, img: "44_boulon.webp", zones: [34], key_words: ["boulon", "écrou", "ecrou", "vis", "fonte", "gris", "métal"] },
{ id: 45, img: "45_raccord_pvc_hta.webp", zones: [90, 131], key_words: ["pvc", "chaleur", "hta", "haute", "température", "temperature", "marron"] },
{ id: 46, img: "46_raccord_pvc_hta_evac.webp", zones: [76], key_words: ["pvc", "chaleur", "hta", "haute", "température", "temperature", "marron", "évacuation", "evacuation"] },
{ id: 47, img: "47_raccord_pvc_u.webp", zones: [91, 65, 130], key_words: ["pvc", "pression", "préssion", "haute", "gris", "irrigation"] },
{ id: 48, img: "48_bride_collet_pvc.webp", zones: [64], key_words: ["bride", "collet", "pvc", "gris"] },
{ id: 49, img: "49_joint_plat.webp", zones: [64], key_words: ["joint", "plat", "noir"] },
{ id: 50, img: "50_joint_fibre.webp", zones: [25], key_words: ["joint", "plat", "fibre", "vert", "rouge"] },
{ id: 51, img: "51_raccord_multicouche_nicoll.webp", zones: [70], key_words: ["raccord", "multicouche", "multi-couche", "nicoll", "mixal", "pexal", "métal", "sertir"] },
{ id: 52, img: "52_raccord_multicouche_valsir.webp", zones: [68, 69], key_words: ["raccord", "multicouche", "multi-couche", "valsir", "métal", "sertir"] },
{ id: 53, img: "53_robinets.webp", zones: [67], key_words: ["robinet", "rouge", "bleu", "métal", "métal", "irrigation", "vannes"] },
{ id: 54, img: "54_applique_mal.webp", zones: [67], key_words: ["robinet", "applique", "machine", "à", "a", "laver", "lavé", "gris"] },
{ id: 55, img: "55_applique_douche.webp", zones: [63], key_words: ["applique", "douche", "gris", "sertir", "plaque"] },
{ id: 56, img: "56_nourrice_laiton.webp", zones: [62], key_words: ["nourrice", "nourice", "nourrisse", "nourisse", "collecteur", "jaune", "laiton", "sorties", "irrigation"] },
{ id: 57, img: "57_nourrice_laiton_robinet.webp", zones: [61], key_words: ["robinet", "nourrice", "nourice", "nourrisse", "nourisse", "collecteur", "jaune", "laiton", "sorties", "irrigation"] },
{ id: 58, img: "58_siphon_cour.webp", zones: [11], key_words: ["siphon", "cours", "coure", "pvc", "gris", "sable", "beige", "carré", "carre", "grille"] },
  
{ id: 59, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 60, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 61, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 62, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 63, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 64, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 65, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 66, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 67, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 68, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 69, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 70, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 71, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 72, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 73, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 74, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 75, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 76, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 77, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 78, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 79, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 80, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 81, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 82, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 83, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 84, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 85, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 86, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 87, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 88, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 89, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 90, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 91, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 92, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 93, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 94, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 95, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 96, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 97, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 98, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 99, img: "xxxxx.webp", zones: [], key_words: [] },
  { id: 100, img: "xxxxx.webp", zones: [], key_words: [] },
];





export default function WherePage(){

    const inputRef = useRef<HTMLInputElement>(null);
    
    const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
    const [selectedZones, setSelectedZones] = useState<number[]>([]);
    const [searchInput, setSearchInput] = useState<string>("");
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([])
    const [reveal, setReveal] = useState(false);

    // DATA FOR ZONES
    const [data, setData] = useState<ProductEntry[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getProductData()
        .then((res) => setData(res))
        .catch((err) => {
            console.error(err);
            setError('Erreur lors du chargement des données.');
            console.log("pas bon")
        })
        .finally(() => setLoading(false));
    }, []);
    
    useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const searchTerms = searchInput.toLowerCase().trim().split(/\s+/);

      const newFiltered = articles.filter(article =>
        searchTerms.every(term =>
          article.key_words.some(keyword => keyword.toLowerCase().startsWith(term))
        )
      );

      setFilteredArticles(newFiltered);
    }, 300); // délai de debounce en ms

    return () => clearTimeout(delayDebounce);
  }, [searchInput]);


    const selectArt = (id: number) =>{
        
        console.log(`article ${id}`)
        setSelectedArticle(id);
        const zones = articles.filter(art => art.id === id)[0].zones
        ;
        if(zones){
            setSelectedZones(zones)
        }
    }

    const handleReveal = () =>{
        
        if(reveal){
            setReveal(false);
            setSelectedArticle(null);
            setSelectedZones([]);
        }

        else{
            
            setReveal(true);
            console.log("caca")
            const zones = [];
            for(let i = 1; i <200; i++){zones.push(i)}

            const zones_already_done: number[] = [];
            console.log(zones_already_done)
            articles.map(art => {
                if(art.zones.length>0){
                    art.zones.map(z => zones_already_done.push(z))
                }
            })
            
            const zone_to_reveal:number[] = [];

            zones.map(z=>{
                if(!zones_already_done.includes(z)){
                    zone_to_reveal.push(z);
                    
                }
            })
            console.log(zone_to_reveal)
            setSelectedZones(zone_to_reveal)
            
        }
        


    }
    
    
    return (
        
        <div className="flex-1 flex flex-row h-full">
            {/* temp */}
            <div className={clsx("absolute top-0 right-0 z-9999 cursor-pointer p-2 rounded-md", reveal && "bg-blue-400")} onClick={handleReveal}>SHOW</div>


            {/* Sidebar articles scrollable */}
            
            <div className="relative flex-1 flex flex-col  bg-white">

                {/* Research */}
                <div className="flex flex-row justify-center  top-0 bg-white/70 backdrop-blur-md p-4">
                    <div className="flex items-center gap-2 bg-blue-light p-3 rounded-[50px] md:w-[70%] w-full">
                        <svg className={clsx("transition duration-300", (searchInput !== "") ? "scale-115 stroke-blue-dark" : "stroke-blue-primary")} xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 48 48"><g fill="none" stroke-linejoin="round" stroke-width="4"><path d="M21 38c9.389 0 17-7.611 17-17S30.389 4 21 4S4 11.611 4 21s7.611 17 17 17Z"/><path stroke-linecap="round" d="M26.657 14.343A7.98 7.98 0 0 0 21 12a7.98 7.98 0 0 0-5.657 2.343m17.879 18.879l8.485 8.485"/></g></svg>
                        <input ref={inputRef} value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} className="flex-1 outline-0 text-xl" type="text" placeholder="Code article / code zone"/>
                        
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

                {/* Articles */}
                {/* <div className="relative grid grid-cols-3 gap-3 md:flex md:items-start md:flex-wrap md:justify-start px-2 overflow-y-auto">
                {filteredArticles.map(art => (
                    <ArticleCard
                    sm={false}
                    key={art.id}
                    id={art.id}
                    selectedArticle={selectedArticle}
                    setSelectedArticle={selectArt}
                    img_src={art.img}
                    />
                ))}
                </div> */}
            </div>

            {/* PLAN */}

            {/* Mobile */}
            <AnimatePresence>
                {
                    selectedArticle && 

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-blue-light fixed top-0 left-0 h-screen w-screen flex flex-col z-500 p-3">

                        <div className="flex flex-row justify-between items-start">
                            <svg onClick={()=>setSelectedArticle(null)} className="fill-blue-primary" xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"><path  d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"/></svg>
                            {selectedArticle && 
                                <ArticleCard sm={true} id={selectedArticle} selectedArticle={selectedArticle} setSelectedArticle={selectArt} img_src={articles.filter(art => art.id === selectedArticle)[0].img}/>
                            }
                        </div>
                        
                        <MainPlan selectedZones={selectedZones}></MainPlan>

                    </motion.div>
                }
            </AnimatePresence>

            {/* Big screen */}
            <div className="hidden md:flex md:h-full md:bg-blue-light md:p-5">
                <MainPlan selectedZones={selectedZones}></MainPlan>
            </div>

        </div>

    )
}