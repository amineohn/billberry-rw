import { ReactNode } from 'react'

import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'
type SiteLayoutProps = {
  children: ReactNode
}

const SitesLayout = ({ children }: SiteLayoutProps) => {
  return (
    <div className="bg-white text-gray-600 m-auto">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.sites()} className="rw-link">
            Sites
          </Link>
        </h1>
        <Link to={routes.newSite()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Site
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default SitesLayout
