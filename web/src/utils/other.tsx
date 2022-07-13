export const jsonDisplay = (
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
): JSX.Element => {
  return (
    <pre>
      <code>{JSON.stringify(value, replacer, space)}</code>
    </pre>
  )
}

export const timeTag = (dateTime: string) => {
  const date = new Date(dateTime).toUTCString()
  return (
    dateTime && (
      <time dateTime={dateTime} title={dateTime}>
        {date}
      </time>
    )
  )
}
export const confirmated = (
  data: string,
  method: string,
  id: number
): boolean => {
  return confirm(`Are you sure you want to ${method} ${data} ${id} ?`)
}

export const checkboxInputTag = (checked: boolean): JSX.Element => {
  return (
    <input
      type="checkbox"
      checked={checked}
      disabled={checked ? false : true}
    />
  )
}

export const convertedDay = (dateTime, times: any) => {
  const date = new Date(dateTime)
  const time = times
    ? date.getDay() +
      '/' +
      date.getMonth() +
      '/' +
      date.getFullYear() +
      ' à ' +
      date.getHours() +
      ':' +
      date.getMinutes()
    : date.getDay() +
      '/' +
      date.getMonth() +
      '/' +
      date.getFullYear() +
      ' de ' +
      date.getHours() +
      ':' +
      date.getMinutes()
  return time
}
