import Header from 'src/components/Header/Header'
import Navigation from 'src/components/Navigation/Navigation'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {

  return (
    <>
      <Header />
      <Navigation />
      <main className='flex items-center justify-center'>{children}</main>
    </>
  )
}

export default DefaultLayout
