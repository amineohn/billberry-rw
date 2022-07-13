import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

type CustomerLayoutProps = {
  children: React.ReactNode
}

const CustomersLayout = ({ children }: CustomerLayoutProps) => {
  return (
    <div className="rw-scaffold">
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.customers()} className="rw-link">
            Customers
          </Link>
        </h1>
        <Link to={routes.newCustomer()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div>
          New Customer
        </Link>
      </header>
      <main className="rw-main">{children}</main>
    </div>
  )
}

export default CustomersLayout
