import React from 'react'
import { AppContext } from './App'; 

export const Column = ({index}) => {  
    const context = React.useContext(AppContext); 

    const active = context.randomNumber === index && !context.arrayUser.includes(index) && !context.endGameValue
    const win = context.arrayUser.includes(index)
    const lose = context.arrayComputer.includes(index) 
    const currentClass = active ? 'active' : win ? 'win' : lose ? 'lose' : ''

    return <td data-val={index} className={currentClass}></td> 
}  