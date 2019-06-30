# Use-lazy-hooks
React hook for resource lazy loading.

## Usage

Create a image component that supports lazy loading for imgs.

```javascript
import React from 'react'
import useLazy from 'use-lazy'

const ref = React.createRef()

function Img(props) {
  const isInSight = useLazy(ref, { bottom: 600, right: 800 })

  return <img {...props} ref={ref} src={isInSight ? props.src : ''} />
}
```
