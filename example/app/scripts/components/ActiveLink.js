import React from 'react'
import { Link } from 'react-router'

export default function ActiveLink (props) {
  return <Link {...props} />
}

ActiveLink.defaultProps = {
  activeClassName: 'active',
}
