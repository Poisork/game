import React from 'react'
import T from 'prop-types'
import AppContext from './context'

export const Column = ({index}) => {
  const context = React.useContext(AppContext)
  const {arrayUser, randomNumber, endGameValue, arrayComputer} = context
  const active =
    randomNumber === index && !arrayUser.includes(index) && !endGameValue
  const win = arrayUser.includes(index)
  const lose = arrayComputer.includes(index)

  return (
    <td
      data-val={index}
      className={(active && 'active') || (win && 'win') || (lose && 'lose')}
    />
  )
}

Column.propTypes = {
  index: T.number,
}
