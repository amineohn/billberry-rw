import humanize from 'humanize-string'

export const formatDatetime = (value: string) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
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
