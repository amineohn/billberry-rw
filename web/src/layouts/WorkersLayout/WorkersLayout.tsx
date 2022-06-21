import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type WorkerLayoutProps = {
  children: React.ReactNode
}

const WorkersLayout = ({ children }: WorkerLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link
            to={routes.workers()}
            className="rw-link"
          >
            Workers
          </Link>
        </h1>
        <Link
          to={routes.newWorker()}
          className="rw-button rw-button-green"
        >
          <div className="rw-button-icon">+</div> New Worker
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default WorkersLayout
