import { promises as fs } from 'fs'
import path from 'path'

import { GetStaticProps, InferGetStaticPropsType } from 'next'

import Card from 'components/BoostCard'
import Container from 'components/Container'
import { Boost } from 'lib/types'

export default function Home({
  boosts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <div className='flex flex-col gap-4'>
        {boosts.map((boost: Boost, index: number) => (
          <Card key={index} {...boost} />
        ))}
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
