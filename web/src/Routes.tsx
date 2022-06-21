// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Set, Router, Route } from '@redwoodjs/router'

import TasksLayout from 'src/layouts/TasksLayout'

import EquimentLayout from 'src/layouts/EquimentLayout'

import WorkersLayout from 'src/layouts/WorkersLayout'

import ServicesLayout from 'src/layouts/ServicesLayout'

import MaterialsLayout from 'src/layouts/MaterialsLayout'

import ContainersLayout from 'src/layouts/ContainersLayout'

import SitesLayout from 'src/layouts/SitesLayout'

import CustomersLayout from 'src/layouts/CustomersLayout'

const Routes = () => {
  return (
    <Router>
      <Route path="/login" page={LoginPage} name="login" />
      <Route path="/signup" page={SignupPage} name="signup" />
      <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
      <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      <Route path="/" page={HomePage} name="home" />
      <Set wrap={TasksLayout}>
        <Route path="/tasks/new" page={TaskNewTaskPage} name="newTask" />
        <Route path="/tasks/{id:Int}/edit" page={TaskEditTaskPage} name="editTask" />
        <Route path="/tasks/{id:Int}" page={TaskTaskPage} name="task" />
        <Route path="/tasks" page={TaskTasksPage} name="tasks" />
      </Set>
      <Set wrap={EquimentLayout}>
        <Route path="/equiment/new" page={EquipmentNewEquipmentPage} name="newEquipment" />
        <Route path="/equiment/{id:Int}/edit" page={EquipmentEditEquipmentPage} name="editEquipment" />
        <Route path="/equiment/{id:Int}" page={EquipmentEquipmentPage} name="equipment" />
        <Route path="/equiment" page={EquipmentEquimentPage} name="equiment" />
      </Set>
      <Set wrap={WorkersLayout}>
        <Route path="/workers/new" page={WorkerNewWorkerPage} name="newWorker" />
        <Route path="/workers/{id:Int}/edit" page={WorkerEditWorkerPage} name="editWorker" />
        <Route path="/workers/{id:Int}" page={WorkerWorkerPage} name="worker" />
        <Route path="/workers" page={WorkerWorkersPage} name="workers" />
      </Set>
      <Set wrap={ServicesLayout}>
        <Route path="/services/new" page={ServiceNewServicePage} name="newService" />
        <Route path="/services/{id:Int}/edit" page={ServiceEditServicePage} name="editService" />
        <Route path="/services/{id:Int}" page={ServiceServicePage} name="service" />
        <Route path="/services" page={ServiceServicesPage} name="services" />
      </Set>
      <Set wrap={MaterialsLayout}>
        <Route path="/materials/new" page={MaterialNewMaterialPage} name="newMaterial" />
        <Route path="/materials/{id:Int}/edit" page={MaterialEditMaterialPage} name="editMaterial" />
        <Route path="/materials/{id:Int}" page={MaterialMaterialPage} name="material" />
        <Route path="/materials" page={MaterialMaterialsPage} name="materials" />
      </Set>
      <Set wrap={ContainersLayout}>
        <Route path="/containers/new" page={ContainerNewContainerPage} name="newContainer" />
        <Route path="/containers/{id:Int}/edit" page={ContainerEditContainerPage} name="editContainer" />
        <Route path="/containers/{id:Int}" page={ContainerContainerPage} name="container" />
        <Route path="/containers" page={ContainerContainersPage} name="containers" />
      </Set>
      <Set wrap={SitesLayout}>
        <Route path="/sites/new" page={SiteNewSitePage} name="newSite" />
        <Route path="/sites/{id:Int}/edit" page={SiteEditSitePage} name="editSite" />
        <Route path="/sites/{id:Int}" page={SiteSitePage} name="site" />
        <Route path="/sites" page={SiteSitesPage} name="sites" />
      </Set>
      <Set wrap={CustomersLayout}>
        <Route path="/customers/new" page={CustomerNewCustomerPage} name="newCustomer" />
        <Route path="/customers/{id:Int}/edit" page={CustomerEditCustomerPage} name="editCustomer" />
        <Route path="/customers/{id:Int}" page={CustomerCustomerPage} name="customer" />
        <Route path="/customers" page={CustomerCustomersPage} name="customers" />
      </Set>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
