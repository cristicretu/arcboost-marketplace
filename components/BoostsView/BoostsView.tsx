import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import Card from 'components/BoostCard'
import SearchIcon from 'components/SearchIcon'
import cn from 'lib/classNames'
import { Boost } from 'lib/types'

interface BoostsViewProps {
  boosts: Boost[]
}

export default function BoostsView({ boosts }: BoostsViewProps) {
  const [filteredBoosts] = useState<Boost[]>(boosts)
  const [input, setInput] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>(null)

  const searchResults = useMemo(() => {
    const filteredResults: Boost[] = filteredBoosts.filter(result =>
      result.name.toLowerCase().includes(input.toLowerCase())
    )

    return filteredResults
  }, [filteredBoosts, input])

  const categories = useMemo(() => {
    return [...new Set(searchResults.map(boost => boost.website))]
  }, [searchResults])

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
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  })
  return (
    <div className='flex mx-auto'>
      {/* sidebar */}
      <div
        // className='flex flex-col flex-shrink-0 sticky mr-8'
        className='flex flex-col top-20 flex-shrink-0 sticky mr-8 h-screen top-navbar'
        style={{ height: 'fit-content' }}
      >
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
            ref={inputRef}
            className={cn(
              'bg-gray-50 dark:bg-gray-800 text-primary block w-full pl-10 py-2 text-sm rounded-md',
              'border border-gray-200 dark:border-gray-700',
              'pr-0 md:pr-12',
              'focus:outline  focus:ring-blue-300 dark:focus:ring-blue-700 focus:ring-4 focus:outline-2 focus:outline-blue-500'
            )}
            placeholder='Search for boosts...'
            aria-label='Search for boosts'
            onChange={handleChange}
            spellCheck={false}
            autoComplete='off'
          />
          <div className='hidden md:flex absolute inset-y-0 right-0 py-2 pr-2 pointer-events-none text-tertiary'>
            <kbd className='inline-flex items-center border border-gray-200 dark:border-gray-700 rounded px-2 text-sm font-sans font-medium text-gray-400'>
              ⌘K
            </kbd>
          </div>
        </form>
        <h3 className='font-semibold'>Websites</h3>
        <div className='flex flex-col gap-2 mt-4'>
          {categories.map(category => (
            <a
              href={`#${category}`}
              key={category}
              className={cn(
                'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100',
                'flex p-2 text-sm rounded-md'
              )}
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      <div className='flex flex-col gap-2 -mt-6'>
        {categories.map((category, index) => (
          <div key={index}>
            <h3
              id={category}
              className='py-2 pl-2  font-semibold filter-blur-small sticky top-[68px] z-[2] text-2xl lg:text-3xl'
            >
              {category}
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
              {searchResults.map((boost, newIndex) => {
                if (boost.website === category) {
                  return <Card key={newIndex} {...boost} />
                }
              })}
            </div>
          </div>
        ))}
      </div>
      {!searchResults.length && <p className='w-96'>No boosts found.</p>}
    </div>
  )
}
