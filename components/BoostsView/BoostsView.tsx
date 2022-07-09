import React, { useCallback, useEffect, useState } from 'react'

import Card from 'components/BoostCard'
import cn from 'lib/classNames'
import { Boost } from 'lib/types'

interface BoostsViewProps {
  boosts: Boost[]
}

export default function BoostsView({ boosts }: BoostsViewProps) {
  const [filteredBoosts, setFilteredBoosts] = useState<Boost[]>(boosts)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const search = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target
      if (!value) {
        return
      }

      const filtered: Boost[] = boosts.filter(boost => {
        const { name } = boost
        return name.toLowerCase().includes(value.toLowerCase())
      })

      setFilteredBoosts(filtered)
    },
    [boosts]
  )

  useEffect(() => {
    const handler = (event: {
      key: string
      preventDefault: () => void
      metaKey: boolean
    }) => {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })
  return (
    <div className='flex'>
      {/* sidebar */}
      <div className='flex flex-col flex-shrink-0 sticky mr-8'>
        <form
          className='rounded-md my-2'
          onSubmit={event => {
            event.preventDefault()
          }}
        >
          <div>search</div>
          <input
            type='text'
            className={cn()}
            placeholder='Search for boosts...'
            ref={inputRef}
            onChange={search}
          />
          <div className='hidden md:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 pointer-events-none'>
            <kbd>⌘K</kbd>
          </div>
        </form>
      </div>

      {/* cards */}
      <div>
        {/* {filteredBoosts.map(boost => (
          <Card key={boost.id} {...boost} />
        ))} */}
      </div>
    </div>
  )
}
