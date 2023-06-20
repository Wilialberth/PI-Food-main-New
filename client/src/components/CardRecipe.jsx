import React from "react";
import './CardRecipe.css'

//Este componente puede ser utilizado en otros componentes de React para mostrar información de una receta específica, pasando las props correspondientes al componente CardRecipe.

export default function CardRecipe({ name, image, diets, id, healthScore }){ // quité id
    return (
        <div className="card">
            <h3>{name}</h3>
            <img className= 'cardImage' src= {image} alt='Not found'/>
            <div>
                {diets?.map(e =>
                <h5 key={e}>{e}</h5>)}
            </div> 
            <span>HealthScore:{healthScore}</span>
        </div>
    )
}