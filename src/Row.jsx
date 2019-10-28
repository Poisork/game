import React from 'react'
import T from 'prop-types'
import {Column} from './Column'

export const Row = ({index, field}) => {
  const range = (start, end) => {
    let foo = []
    for (let i = start + 1; i <= end; i++) {
      foo = [...foo, i]
    }
    return foo
  }
  const arr = range(index * field, field * index + field)
  return (
    <tr>
      {arr.map(el => (
        <Column key={el} index={el} />
      ))}
    </tr>
  )
}

Row.propTypes = {
  index: T.number,
  field: T.number,
}
