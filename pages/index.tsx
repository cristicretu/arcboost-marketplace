import { promises as fs } from 'fs'
import path from 'path'

import { useEffect } from 'react'

import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Card from 'components/BoostCard'
import Container from 'components/Container'
import { Boost } from 'lib/types'
import cn from 'lib/classNames'
import React from 'react'

export default function Home({
  boosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const inputRef = React.useRef<HTMLInputElement>(null)

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
    <Container>
      <header className='flex flex-col items-center'>
        <h1 className='text-6xl font-bold text-primary'>
          Unofficial Marketplace
        </h1>
        <h2 className='text-6xl font-bold animate-text-shimmer bg-clip-text text-blue-500/40 dark:text-blue-700/60 bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]'>
          for Arc Boosts
        </h2>
      </header>

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
            <input type="text" className={cn()} placeholder="Search for boosts..." ref={inputRef} onChange=(event) => { search(e.target.value)} />
            <div className="hidden md:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 pointer-events-none">
            <kbd>⌘K</kbd>
          </div>
          </form>
        </div>

        {/* cards */}
        <div></div>
      </div>
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async function () {
  const boostDirectory = path.join(process.cwd(), 'data/manifest')
  const filenames = await fs.readdir(boostDirectory)

  const boosts = filenames.map(async filename => {
    const filepath = path.join(boostDirectory, filename)
    const manifest = await fs.readFile(filepath, 'utf8')
    const id = filename.replace('.json', '')

    // add the id to the manifest as a object property
    const manifestObject: Boost = JSON.parse(manifest)
    manifestObject.id = id

    return manifestObject
  })

  return {
    props: {
      boosts: (await Promise.all(boosts)) as Boost[],
    },
  }
}
