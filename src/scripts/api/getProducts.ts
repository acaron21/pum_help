

function normalizeId(id: any) {
  if (typeof id === "object" && "low" in id) {
    return `${id.low}`;
  }
  return id;
}

export async function getCompatibleProduct(diam: number){
    console.log("diam : ", diam)
    const res = await fetch(import.meta.env.VITE_API_URL + "/products/get-product-by-category", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            diameter: diam,
        }),
        });
    let categories = await res.json();
    

    // Normalise
    const normalized = categories.map((cat: any) => ({
        ...cat,
        products: cat.products.map((p: any) => ({
            ...p,
            id: normalizeId(p.id),
            courbure: normalizeId(p.courbure)
        }))
    }))

    console.log(normalized)

    return normalized;
}

// Get all products for string searching
export async function fetchGetAllArticles(){

    const res = await fetch(import.meta.env.VITE_API_URL + "/products/get-all", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
        });
    let data = await res.json();
    
    return data;
}