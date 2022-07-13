import { navigate } from '@redwoodjs/router'

export default () => {
  const navigateThisOne = (to: string): string => {
    return navigate(to) as void as any
  }
  const urlExists = (): boolean => {
    enum Status {
      PAGENOTFOUND = 404,
      FOUND = 200,
      ERROR_SERVER = 500,
      BAD_REQUEST = 400,
      UNAUTHORIZED = 401,
    }
    const http = new XMLHttpRequest()
    http.open('HEAD', navigateThisOne('/'), false)
    http.send()

    switch (http.status) {
      case Status.FOUND:
        return true
      case Status.PAGENOTFOUND:
        return false
      case Status.ERROR_SERVER:
        return false
      case Status.BAD_REQUEST:
        return false
      case Status.UNAUTHORIZED:
        return false
      default:
        return true
    }
    return false
  }
  if (!urlExists()) {
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
