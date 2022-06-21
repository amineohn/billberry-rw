import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MaterialLayoutProps = {
  children: React.ReactNode
}

const MaterialsLayout = ({ children }: MaterialLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.materials()}
            className="rw-link"
          >
            Materials
          </Link>
        </h1>
        <Link
          to={routes.newMaterial()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Material
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default MaterialsLayout
