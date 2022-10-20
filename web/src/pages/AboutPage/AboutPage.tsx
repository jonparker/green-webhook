import { MetaTags } from '@redwoodjs/web'

const AboutPage = () => {
  return (
    <>
      <MetaTags title="About" description="About page" />
      <main>
        <p>
          A proxy or gateway between the system that is invoking the webhook and
          a list of endpoints running in different geographical locations. The
          proxy decides dynamically which endpoint to invoke.
        </p>
      </main>
    </>
  )
}

export default AboutPage
