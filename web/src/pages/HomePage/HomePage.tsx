import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import ListItem from 'src/components/ListItem/ListItem'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <main>
        <div className="flex flex-col md:flex-row justify-center items-center py-24 gap-10 md:my-24">
          <div className='flex flex-col max-w-xl gap-5 w-full'>
            <h2 className='text-green font-bold text-7xl max-w-sm tracking-widest'>GREEN WEBHOOK</h2>
            <p className='text-white text-5xl'>Make your online tasks carbon friendly now!</p>
          </div>
          <div>
            <Link to={routes.signup()}>
                <ListItem styles='bg-green text-white'>Get started</ListItem>
            </Link>
          </div>
        </div>
        <div className='flex flex-col gap-10'>
          <Card>
            <h2 className='bg-white text-black mb-2 text-3xl font-bold tracking-wide'>What problem are we trying to solve?</h2>
            <p className='bg-white text-black'><span className='bg-transparent font-bold text-lg text-red-500'>160kg</span> of CO2 is emitted each year by servers whilst processing compute functionality.<br />
              “On a global level, data centers consume approximately 200 terawatt-hours (TWh) of electricity, or nearly one percent of global electricity demand, while contributing to 0.3% of all global CO2 emissions, according to the International Energy Agency.” <br />

              “...data center energy usage in some countries could increase to levels of 15 to 30 percent of their total domestic electricity consumption by the end of the decade.” </p>
          </Card>
          <Card>
            <h2 className='mb-2 text-3xl font-bold tracking-wider bg-white text-black'>Our solution</h2>
            <p className='bg-white text-black'>The Green Webhook project aims to radically reduce the amount of carbon emitted by cloud compute workloads and in future, personal devices and even smart home devices and other IoT applications.
              The Green Webhook project is an easy to use solution allowing anyone to route traffic and compute intensive workloads to the most carbon friendly location or time of day depending on the real time predictions of the Carbon Aware SDK.</p>
          </Card>
        </div>
      </main>
    </>
  )
}


export const Card = ({children}) => {
  return (
    <div className='md:w-1/2 mx-auto overflow-hidden bg-white rounded-md'>
      <div className="px-6 py-7 bg-white">
      {children}
      </div>
    </div>
  )
}

export default HomePage
