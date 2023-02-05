import { useRef, useState } from 'react'

import { useMatchDevice } from './useMatchDevice'

const useDevice = (asRef = false) => {
  const deviceRef = useRef(null)
  const [device, setDevice] = useState(null)

  useMatchDevice((device) => {
    deviceRef.current = device
    if (!asRef) setDevice(deviceRef.current)
  })

  if (asRef) return deviceRef
  else return device
}

export default useDevice
