import Header from 'src/components/Header/Header'
import Navigation from 'src/components/Navigation/Navigation'

type LayoutProps = {
  buttonLabel: string
  buttonTo: string
  children: React.ReactNode
}

const ScaffoldLayout = ({
  buttonLabel,
  buttonTo,
  children,
}: LayoutProps) => {

  return (
    <>
      <Header />
      <Navigation buttonLabel={buttonLabel} buttonTo={buttonTo}/>
      <main className='flex items-center justify-center px-5'>{children}</main>
    </>
  )
}

export default ScaffoldLayout
