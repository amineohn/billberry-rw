import PropTypes from 'prop-types'
interface IEvent {
  title: string
  serviceName: string
  siteName: string
  customerName: string
  materialName: string
  workerName: string
  desc?: string
}
interface IEventsProps {
  event: IEvent
}
function MyEvent({ event }: IEventsProps) {
  return (
    <span className="flex flex-col">
      <strong>{event.title}</strong>
      <span>{event.serviceName}</span>
      <span>{event.siteName}</span>
      <span>{event.customerName}</span>
      <span>{event.materialName}</span>
      <span>{event.workerName}</span>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}
MyEvent.propTypes = {
  event: PropTypes.object,
}
export default MyEvent
