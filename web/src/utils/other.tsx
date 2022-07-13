export const jsonDisplay = (
  value: any,
  replacer?: (this: any, key: string, value: any) => any,
  space?: string | number
) => {
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

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}
