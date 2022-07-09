import React, { useCallback, useEffect, useMemo, useState } from 'react'

import Card from 'components/BoostCard'
import SearchIcon from 'components/SearchIcon'
import cn from 'lib/classNames'
import { Boost } from 'lib/types'

interface BoostsViewProps {
  boosts: Boost[]
}

export default function BoostsView({ boosts }: BoostsViewProps) {
  const [filteredBoosts, setFilteredBoosts] = useState<Boost[]>(boosts)
  const [input, setInput] = useState<string>('')

  const searchResults = useMemo(() => {
    const filteredResults: Boost[] = filteredBoosts.filter(result =>
      result.name.toLowerCase().includes(input.toLowerCase())
    )

    return filteredResults
  }, [filteredBoosts, input])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

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
    <div className='flex mx-auto'>
      {/* sidebar */}
      <div className='flex flex-col flex-shrink-0 sticky mr-8'>
        <form
          className='rounded-md my-2'
          onSubmit={event => {
            event.preventDefault()
          }}
        >
          <SearchIcon />
          <input
            type='text'
            value={input}
            className={cn()}
            placeholder='Search for boosts...'
            aria-label='Search for links or commands'
            onChange={handleChange}
            spellCheck={false}
            autoComplete='off'
          />
          <div className='hidden md:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 pointer-events-none'>
            <kbd>⌘K</kbd>
          </div>
        </form>
        <h3 className='font-semibold'>Websites</h3>
      </div>

      {/* cards */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {searchResults.map(boost => (
          <Card key={boost.id} {...boost} />
        ))}
      </div>
    </div>
  )
}
