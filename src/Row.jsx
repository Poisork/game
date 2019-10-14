import React from 'react'
import {Column} from './Column'

export const Row = ({index, field, ...props}) => { 
     
    const range = (start, end) => {
        let foo = [];
        for (let i = start + 1; i <= end; i++) {
           foo = [...foo,i]
        }  
        return foo;
    }  
    let arr = range(index * field,(field * index) + field)  
    return( 
       <tr>
           {
            arr.map(el => (
                <Column
                    key={el} 
                    index={el}
                    {...props}
                />
            ))
            }
       </tr>
    )
} 