import { promises as fs } from 'fs'
import path from 'path'

import { GetStaticProps, InferGetStaticPropsType } from 'next'

import BoostsView from 'components/BoostsView'
import Container from 'components/Container'
import { Boost } from 'lib/types'

export default function Home({
  boosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <header className='flex flex-col items-center p-2 md:p-24 '>
        <h1 className='text-4xl sm:text-5xl lg:text-7xl font-bold text-primary'>
          Unofficial Marketplace
        </h1>
        <h2 className='text-4xl sm:text-5xl lg:text-7xl font-bold animate-text-shimmer bg-clip-text text-blue-500/40 dark:text-blue-700/60 bg-[linear-gradient(110deg,#e2e8f0,45%,#1e293b,55%,#e2e8f0)] bg-[length:250%_100%]'>
          for Arc Boosts
        </h2>
      </header>
      <BoostsView boosts={boosts} />
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
