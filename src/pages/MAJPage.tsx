

export default function MAJPage(){
    return (
        <div className="flex flex-col p-3">
            <div className="flex gap-3">
                <p className="font-bold">16/07/25</p>
                <p>Ajout IC 2766 avec les codes pour le CR4/CR8</p>
            </div>
            <div className="flex gap-3">
                <p className="font-bold">16/07/25</p>
                <p>Possibilité de rechercher directement un IC par son code</p>
            </div>
            <div className="flex gap-3">
                <p className="font-bold">16/07/25</p>
                <p>Ajout d'un bouton home pour reset les filtres rapidement</p>
            </div>
            <div className="flex gap-3">
                <p className="font-bold">16/07/25</p>
                <p>Ajout d'un filtre tube/couronne/béton+fonte</p>
            </div>
            <br />
            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Correction codes couvercles béton</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout section "Du nouveau ?"</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout des codes barres pour économiser l'usure de nos doigts (en prototype)</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout de l'IC 117 (tubes PVC) et de son outil. (Pour éviter de scanner 2 fois le ⌀80 avant de choper le ⌀75)</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout du sélecteur de couronne TPC dans l'IC 67</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout du sélecteur de couronne PE dans l'IC 116</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout du terme "sanitaire" dans l'IC 68</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout d'un icône "montre" sur les IC disposant d'un outils pour gagner du temps (outils inutiles pour Alexis bien sûr)</p>
            </div>

            <div className="flex gap-3">
                <p className="font-bold">10/07/25</p>
                <p>Ajout d'un overvlay à l'appui d'un code barre (pour ceux qui savent pas viser)</p>
            </div>

            <br />
            <p>En prévision : </p>
            <p className="text-orange-700 italic">- Ajout des tampons composites dans le selecteur de Regard béton (IC 843) ?</p>
            <p className="text-orange-700 italic">- Ajout d'une option "opercule" pour le selecteur de Regard béton (IC 843) ?</p>
            <p className="text-orange-700 italic">- Après un petit cours sur le sujet ={">"} Ajout d'un sélecteur/outil pour les chambres télécom et leurs tampons.</p>
            <p className="text-orange-700 italic">- </p>
        </div>

    )
}