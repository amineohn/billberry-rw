import { navigate } from '@redwoodjs/router'

export default () => {
  const navigateThisOne = (to: string): string => {
    return navigate(to) as void as any
  }
  const urlExists = (): boolean => {
    const http = new XMLHttpRequest()
    http.open('HEAD', navigateThisOne('/'), false)
    http.send()
    switch (http.status) {
      case 200:
        return true
      case 404:
        return false
      default:
        return true
    }
    return false
  }
  if (!urlExists()) {
    // back to current page
    navigate('/')
  }
  return (
    <main className={'flex items-center justify-center'}>
      <section className={'bg-white'} style={{ margin: '45vh auto 50vh auto' }}>
        <div className={'bg-gray-500 px-6 py-6 rounded-xl'}>
          <span className={'text-neutral-50 font-semibold text-2xl'}>
            Page Not Found (404)
          </span>
        </div>
      </section>
    </main>
  )
}
