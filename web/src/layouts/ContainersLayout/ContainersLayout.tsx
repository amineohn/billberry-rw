import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type ContainerLayoutProps = {
  children: React.ReactNode
}

const ContainersLayout = ({ children }: ContainerLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.containers()} className="rw-link">
            Containers
          </Link>
        </h1>
        <Link to={routes.newContainer()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div>
          New Container
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default ContainersLayout
