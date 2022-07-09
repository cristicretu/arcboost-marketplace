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
          className='relative rounded-md mb-4'
          onSubmit={event => event.preventDefault()}
        >
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
            <SearchIcon aria-hidden='true' />
          </div>
          <input
            type='text'
            value={input}
            // className={cn()}
            // className='block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100'
            className={cn(
              'bg-gray-50 dark:bg-gray-800 text-primary block w-full pl-10 py-2 text-sm rounded-md',
              'border border-gray-200 dark:border-gray-700',
              'pr-0 md:pr-12'
            )}
            placeholder='Search for boosts...'
            aria-label='Search for boosts'
            onChange={handleChange}
            spellCheck={false}
            autoComplete='off'
          />
          <div className='hidden md:flex absolute inset-y-0 right-0 py-2 pr-2 pointer-events-none text-tertiary'>
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
