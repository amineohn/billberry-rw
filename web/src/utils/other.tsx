import humanize from 'humanize-string'

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

export const formatEnum = (values: string | string[] | null | undefined) => {
  if (values) {
    if (Array.isArray(values)) {
      const humanizedValues = values.map((value) => humanize(value))
      return humanizedValues.join(', ')
    } else {
      return humanize(values as string)
    }
  }
}

export const timeTag = (datetime: string) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}

export const checkboxInputTag = (checked: boolean) => {
  return <input type="checkbox" checked={checked} disabled />
}
