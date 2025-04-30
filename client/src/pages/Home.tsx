import icon from '@/assets/hero.png';

const Home = () => {
  return (
    <div>
      <div className='border-1 flex'>
        <div className='flex-1'>
          Hero
        </div>
        <div className='flex-1'>
          <img src={icon} alt='Hero Image' />
        </div>
      </div>
    </div>
  )
}

export default Home
