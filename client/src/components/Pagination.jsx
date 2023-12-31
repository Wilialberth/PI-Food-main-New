import React from "react";
import './Pagination.css'
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentPage } from '../actions/index'

export default function Pagination({ recipesPerPage, allRecipes }){

    const dispatch = useDispatch();
    const page = useSelector(state => state.currentPage)

    const pageNumbers = []
    const previousPage = page - 1
    const nextPage = page + 1
    
    for (let i=1; i<= Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i)
    }
    
    const pagination = (num) =>{
        dispatch(changeCurrentPage(num))
    }

    return(
        <div >
            <div className='paginationContainer'>
                <ul className="pages">
                { page >= 2 && 
                <button onClick={() => pagination(1)} className="buttonPrevNext">{"<<"}</button>}
                { page >= 2 && 
                <button onClick={() => pagination(previousPage)} className="buttonPrevNext">{"<"}</button>}
                {pageNumbers?.map(paged =>
                <button key={paged} onClick={() => pagination(paged)} className = {page === paged ? 'pagination-active' : 'pagination'}>{paged}</button>)}
                { page >= 1 && page < Math.ceil(allRecipes/recipesPerPage) && 
                <button onClick={() => pagination(nextPage)} className="buttonPrevNext">{">"}</button>}
                { page < (allRecipes/recipesPerPage) && 
                <button onClick={() => pagination(Math.ceil(allRecipes/recipesPerPage))} className="buttonPrevNext">{">>"}</button>}
                </ul>
            </div>
        </div>
 
)}