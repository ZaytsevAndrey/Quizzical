import React from 'react'
import Confetti from 'react-confetti'

export default () => {
  // const { width, height } = useWindowSize()
  return (
    <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}