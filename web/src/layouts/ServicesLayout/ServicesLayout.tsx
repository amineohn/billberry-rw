import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ServiceLayoutProps = {
  children: React.ReactNode
}

const ServicesLayout = ({ children }: ServiceLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.services()}
            className="rw-link"
          >
            Services
          </Link>
        </h1>
        <Link
          to={routes.newService()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Service
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ServicesLayout
