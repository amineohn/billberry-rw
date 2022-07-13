import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type MissionLayoutProps = {
  children: React.ReactNode
}

const MissionsLayout = ({ children }: MissionLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.missions()} className="rw-link">
            Missions
          </Link>
        </h1>
        <Link to={routes.newMission()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div>
          New Mission
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default MissionsLayout
