# Use-lazy-hooks
React hook for resource lazy loading.

## Installation

`npm install --save use-lazy-hooks`

## Documentation

The useLazy hook returns an `boolean` value indicating whether the element is in the specific area or not.

1. [Example](#example)
2. [Options](#options)

## <a id="example">Example</a>
Mostly, we'll need an image to be lazy to save the bandwidth and improve the performance. Let's create an image component with `use-lazy` hook.

1. create a ref representing the image dom element that will be mounted.

1. call the use `useLazy` hook with the ref object.

> Both useRef and React.createRef are the same.

```javascript
import React, { useRef } from 'react'
import useLazy from 'use-lazy'

function Img(props) {
  const ref = useRef(null)
  const isInSight = useLazy(ref)

  return <img {...props} ref={ref} src={isInSight ? props.src : ''} />
}
```

Congratulations, you've created a img component that support lazy loading !

## <a id="options">Options</a>

1. **ref**

    Created by `useRef` or `React.createRef`.

1. **coordinate**

    The specific area in which the hook returns `true`. If ignored, the viewport will be the default area.
    **Only `right` & `bottom` prop are supported so far !**

    ```typescript
    interface ICoordinate {
      top?: number,
      right?: number,
      bottom?: number,
      left?: number,
    }
    ```

1. **throttle**

    The handler for scroll/resize throttle. If ignored, the below debounce handler will be used.

    ```typescript
    const debounce = (fn: Function, ctx?: Object, delay: number = 500): EventListener => {
      let timer: number;
      let self: Object = ctx || this;

      return (): void => {
        if (timer) clearTimeout(timer);

        timer = setTimeout((): void => {
          fn.call(self);
        }, delay);
      }
    }    
    ```