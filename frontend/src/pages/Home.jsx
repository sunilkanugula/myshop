
import BestSeller from '../components/BestSeller.jsx'
import Hero from '../components/Hero.jsx'
import LatestCollection from '../components/LAtestCollection.jsx'
import Newsletter from '../components/Newsletter.jsx'
import OurPolicy from '../components/OurPolicy.jsx'

const Home = () => {
  return (
    <div>
      <Hero/>
     <LatestCollection/>
     <BestSeller/>  
     <OurPolicy/>
     <Newsletter/>
      </div>
  )
}

export default Home