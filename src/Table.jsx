import React from 'react'
import T from 'prop-types'
import {Row} from './Row'
import './table.css'

export const Table = React.memo(({field, userCatchColum}) => {
  const content = Array(field)
    .fill(0)
    .map((tr, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Row key={index} index={index} field={field} />
    ))
  return (
    <table onClick={userCatchColum}>
      <tbody>{content}</tbody>
    </table>
  )
})

Table.propTypes = {
  field: T.number,
  userCatchColum: T.func,
}
