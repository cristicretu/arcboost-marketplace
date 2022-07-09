export default function Footer() {
  return (
    <p className='mx-auto my-16 text-quaternary'>
      Crafted with care by
      <a
        className='ml-1 text-primary group'
        href='https://cretu.dev'
        target='_blank'
        rel='noopener noreferrer'
      >
        Cristian Crețu
        <span className='ml-1 invisible group-hover:visible transition-all duration-200'>
          ↗
        </span>
      </a>
    </p>
  )
}
