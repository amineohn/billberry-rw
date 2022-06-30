export const formatDatetime = (value: string) => {
  if (value) {
    return value.replace(/:\d{2}\.\d{3}\w/, '')
  }
}
