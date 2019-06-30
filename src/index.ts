import { useState, useEffect } from 'react'

interface ICoordinate {
  top?: number,
  right?: number,
  bottom?: number,
  left?: number,
}

const judge = (ref: React.RefObject<HTMLElement>, coordinate: ICoordinate): boolean => {
  //log('being judged !')
  if (!ref || !ref.current) return false

  const { top, left } = ref.current.getBoundingClientRect();

  if (top < coordinate.bottom && left < coordinate.right) {
    return true
  } else {
    return false
  }
}

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

const log = (msg: string): void => {
  console.log(`[🐙] ${msg}`)
}

export default (
  ref: React.RefObject<HTMLElement>,
  coordinate = { bottom: window.innerHeight, right: window.innerWidth },
  throttle = debounce
): boolean => {

  const [inSight, setState] = useState(false)

  useEffect(() => {
    const throttledHandler: EventListener = throttle(() => {
      setState(judge(ref, coordinate))
    })

    //log('run into effects')

    window.addEventListener('scroll', throttledHandler)
    window.addEventListener('resize', throttledHandler)
  }, [throttle])

  judge(ref, coordinate)

  return inSight
}