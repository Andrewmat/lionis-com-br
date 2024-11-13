import { useReducer } from 'react'
import { Button } from '~/components/ui/button'

export function Counter({
  className,
}: {
  className?: string
}) {
  const [count, increment] = useReducer((s) => s + 1, 0)

  return (
    <Button
      type='button'
      onClick={increment}
      className={className}
    >
      Count {count}
    </Button>
  )
}
