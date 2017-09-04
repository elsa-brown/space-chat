import React from 'react';

const NotFound = (props) => {
  const { pathname } = props.location || {pathname: '<< no path >>'}
  console.error('NotFound: %s not found (%o)', pathname, props)
  return (
    <div>
      <h1>404 Lost In Space</h1>
    </div>
  )
}

export default NotFound;

