'use client'

import { saveCounterValue } from '@/actions/counter'
import { Box, Button, ButtonGroup, Display2, Display3 } from '@sainsburys-tech/fable'
import { useCallback, useState } from 'react'
import { useAction } from 'next-safe-action/hooks'
import styles from './counter.module.css'
import clsx from 'clsx'

export interface CounterProps {
  defaultValue: number
}

export default function Counter({ defaultValue }: CounterProps) {
  const [total, setTotal] = useState(defaultValue)

  const { executeAsync, hasErrored, hasSucceeded, result } = useAction(saveCounterValue)

  const onAddHandler = useCallback(() => {
    setTotal((prev) => prev + 1)
  }, [setTotal])

  const onSubtractHandler = useCallback(() => {
    setTotal((prev) => prev - 1)
  }, [setTotal])

  const onSubmitHandler = useCallback(() => {
    void executeAsync({ value: total })
  }, [total, executeAsync])

  return (
    <>
      <Display3 as="h2">Example Component</Display3>
      <p>
        This is an example of a client side component with a server side action. You can change state client side, and
        then submit it to the server side action - and use the result from that action.
      </p>
      <Display2>Value: {total}</Display2>

      <Box backgroundColor='primary' border={{radius: 'sm', size: "sm" }} as="pre" className={clsx('fable:mt-1 fable:mb-1', {
          [styles.counterError] : hasErrored,
          [styles.counterSuccess] : hasSucceeded,
        })}>
        <div>HasErrored: {`${hasErrored}`}</div>
        <div>HasSucceeded: {`${hasSucceeded}`}</div>
        {JSON.stringify(result, null, 2)}
      </Box>
      <ButtonGroup>
        <Button variant="secondary" onClick={onAddHandler}>
          Add
        </Button>
        <Button variant="secondary" onClick={onSubtractHandler} disabled={total === 0}>
          Subtract
        </Button>
        <Button variant="primary" onClick={onSubmitHandler}>
          Call server side action
        </Button>
      </ButtonGroup>
    </>
  )
}
