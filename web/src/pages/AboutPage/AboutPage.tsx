import { MetaTags } from '@redwoodjs/web'

import { Card } from '../HomePage/HomePage'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <main>
        <Card>
          <h2 className="mb-2 bg-white text-3xl font-bold tracking-wide text-black">
            ABOUT
          </h2>
          <p className="bg-white text-black">
            A proxy or gateway between the system that is invoking the webhook
            and a list of endpoints running in different geographical locations.
            The proxy decides dynamically which endpoint to invoke.
          </p>
        </Card>
      </main>
    </>
  )
}

export default AboutPage
