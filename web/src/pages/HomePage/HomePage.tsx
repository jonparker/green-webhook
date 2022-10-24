import { MetaTags } from '@redwoodjs/web'

const HomePage = () => {
  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <main className='max-w-7xl'>
        <div className='flex flex-row w-full gap-5'>
          <Card>
            <h2 className='mb-2 text-3xl font-bold tracking-wider'>What problem are we trying to solve?</h2>
            <p>Time or location shifting compute workloads without any code changes or requirement to understand the Carbon Aware SDK. The only thing required is to have an understanding of the behaviour of the workload.</p>
          </Card>
          <Card>
            <h2 className='mb-2 text-3xl font-bold tracking-wider'>Our solution</h2>
            <p>An "Intenet Grid Operator" (IGO). A carbon aware webhook that location and time shifts the workload that is triggered by any HTTP request.
              By being the intelligent "internet grid operator" we can provide demand shaping that works in harmony with the electricity grid supply shaping in order to reduce the carbon emissions the grid causes.</p>
          </Card>
        </div>
      </main>
    </>
  )
}


export const Card = ({children}) => {
  return (
    <div className='w-1/2 mx-auto overflow-hidden bg-white rounded-md shadow-lg'>
      <div className="px-6 py-7">
      {children}
      </div>
    </div>
  )
}

export default HomePage
