import { Toaster } from '@redwoodjs/web/toast'

import Header from 'src/components/Header/Header'
import Navigation from 'src/components/Navigation/Navigation'

type DefaultLayoutProps = {
  children?: React.ReactNode
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Header />
      <Toaster
        containerStyle={{
          position: 'relative',
          zIndex: 9999,
        }}
        toastOptions={{
          // Define default options
          duration: 5000,
          style: {
            background: 'transparent',
            color: '#fff',
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />

      <Navigation buttonLabel="" buttonTo="home" />
      <main className="flex items-center justify-center px-5">{children}</main>
    </>
  )
}

export default DefaultLayout
