import React from 'react'
import { Row } from './Row'
import './table.css'
export const Table = React.memo(({field, userCatchColum, ...props}) => {
 
    const content = Array(field).fill(0).map((tr,index) => (
        <Row 
          key={index} 
          index={index} 
          field={field} 
          {...props}
        />  
      )
    )  
    return (
      <table onClick={userCatchColum}>
        <tbody> 
          {content} 
        </tbody> 
      </table>
    )
})

Table.displayName = 'Table'