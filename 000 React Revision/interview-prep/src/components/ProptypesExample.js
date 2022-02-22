import React from 'react'
import PropTypes from 'prop-types'

export default function Example({val}) {
  return (
    <div>
        <p>Value is a string {val}</p>
    </div>
  )
}

Example.propTypes = {
    val: PropTypes.string
}
