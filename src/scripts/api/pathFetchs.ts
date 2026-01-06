import type { ConnexionState, SelectedArticleState } from "../../pages/Poc/path";

export async function getMaterialOptions(){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/get-material-options", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        });
    let data = await res.json();
    
    return data;
}

export async function getTypeOptions(material: string){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/get-type-options", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectedMaterial: material,
        }),
        });
    let data = await res.json();
    
    return data;
}

export async function getDiamOptions(material: string, type: string){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/get-diam-options", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectedMaterial: material,
            selectedType: type
        }),
        });
    let data = await res.json();
    
    return data;
}

export async function getSexeOptions(material: string, type: string, diam: string){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/get-sexe-options", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            selectedMaterial: material,
            selectedType: type,
            selectedDiam: diam
        }),
        });
    let data = await res.json();
    
    return data;
}


// return : {success: boolean, paths: Path[]}
export async function findPathWithConnexions(connexionA: ConnexionState, connexionB: ConnexionState, nb_articles: number){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/find-paths-connexions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            connexionA: connexionA,
            connexionB: connexionB,
            nb_articles: nb_articles
        }),
        });
    let data = await res.json();
    
    return data;
}

// return : {success: boolean, paths: Path[]}
export async function findPathWithArticles(articleInfoS:SelectedArticleState, articleInfoE:SelectedArticleState, nb_articles: number){

    const res = await fetch(import.meta.env.VITE_API_URL + "/path/find-paths-articles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            connexionA: articleInfoS.connexions[articleInfoS.selectedPortIndex],
            connexionB: articleInfoE.connexions[articleInfoE.selectedPortIndex],
            articleIDA: articleInfoS.id,
            articleIDB: articleInfoE.id,
            nb_articles: nb_articles
        }),
        });
    let data = await res.json();
    
    return data;
}
