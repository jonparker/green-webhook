import { useAuth } from '@redwoodjs/auth'
import { Link, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'

import ListItem from 'src/components/ListItem/ListItem'

const HomePage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <>
      <MetaTags title="Home" description="Home page" />
      <main>
        <div className="flex flex-col items-center justify-center gap-10 py-24 md:my-24 md:flex-row">
          <div className="flex w-full max-w-xl flex-col gap-5">
            <h2 className="max-w-sm text-7xl font-bold tracking-widest text-green">
              GREEN WEBHOOK
            </h2>
            <p className="text-5xl text-white">
              Make your online tasks carbon friendly now!
            </p>
          </div>
          {isAuthenticated ? null : (
            <div>
              <Link to={routes.signup()}>
                <ListItem styles="bg-green text-black m-0 rounded-lg">
                  Get started
                </ListItem>
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-10">
          <Card>
            <h2 className="mb-2 bg-white text-3xl font-bold tracking-wide text-black">
              What problem are we trying to solve?
            </h2>
            <p className="bg-white text-black">
              “On a global level, data centers consume approximately 200
              terawatt-hours (TWh) of electricity, or nearly one percent of
              global electricity demand, while contributing to 0.3% of all
              global CO2 emissions, according to the International Energy
              Agency.” <br />
              “...data center energy usage in some countries could increase to
              levels of 15 to 30 percent of their total domestic electricity
              consumption by the end of the decade.”{' '}
            </p>
          </Card>
          <Card>
            <h2 className="mb-2 bg-white text-3xl font-bold tracking-wider text-black">
              Our solution
            </h2>
            <p className="bg-white text-black">
              The Green Webhook project aims to radically reduce the amount of
              carbon emitted by cloud compute workloads and in future, personal
              devices and even smart home devices and other IoT applications.
              The Green Webhook project is an easy to use solution allowing
              anyone to route traffic and compute intensive workloads to the
              most carbon friendly location or time of day depending on the real
              time predictions of the Carbon Aware SDK.
            </p>
          </Card>
        </div>
      </main>
    </>
  )
}

export const Card = ({ children }) => {
  return (
    <div className="mx-auto overflow-hidden rounded-md bg-white md:w-1/2">
      <div className="bg-white px-6 py-7">{children}</div>
    </div>
  )
}

export default HomePage
