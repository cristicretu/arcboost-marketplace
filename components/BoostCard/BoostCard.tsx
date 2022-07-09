import Image from 'next/image'

import { Boost } from 'lib/types'

export default function Card({
  name,
  description,
  author,
  version,
  image,
  id,
}: Boost): JSX.Element {
  const github = `https://github.com/cristicretu/arcboost-marketplace/tree/main/data/extensions/${id}`

  return (
    <a
      href={`/extensions/${id}.zip`}
      className='w-52 sm:w-64 md:w-72 lg:w-72 xl:w-96 cursor-pointer bg-gray-100 group hover:bg-gray-200 border-black/10 dark:bg-gray-900 border dark:border-white/10 dark:hover:bg-gray-800 transition-all rounded-lg'
    >
      <div className='h-48 w-full  relative'>
        <Image
          src={image}
          objectFit='cover'
          layout='fill'
          className='rounded-t-md'
          alt='Summary image'
        />
      </div>
      <div className='p-2 flex flex-col gap-1'>
        <p className='font-semibold text-lg text-primary'>
          {name}
          <span className='ml-2 invisible group-hover:visible transition-opacity'>
            ↗
          </span>
        </p>
        <p className='text-secondary  truncate'>{description}</p>
        <div className='flex items-center text-sm text-tertiary justify-between'>
          <p>by {author}</p>
          <p>v{version}</p>
        </div>
      </div>
    </a>
  )
}
