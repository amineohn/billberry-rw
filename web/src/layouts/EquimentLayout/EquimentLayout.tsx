import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type EquipmentLayoutProps = {
  children: React.ReactNode
}

const EquimentLayout = ({ children }: EquipmentLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.equiment()}
            className="rw-link"
          >
            Equiment
          </Link>
        </h1>
        <Link
          to={routes.newEquipment()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Equipment
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default EquimentLayout
