import PropTypes from 'prop-types'

interface IEvent {
  title: string
  serviceName: string
  siteName: string
  customerName: string
  materialName: string
  workerName: string
  desc?: string
  event: IEvent
}

interface Props {
  event: IEvent
}

function Events({ event }: Props) {
  return (
    <span className="flex flex-col">
      <strong>
        {event.title.charAt(0).toUpperCase() + event.title.slice(1)}
      </strong>
      <span>service: {event.serviceName}</span>
      <span>site: {event.siteName}</span>
      <span>customer: {event.customerName}</span>
      <span>material: {event.materialName}</span>
      <span>worker: {event.workerName}</span>
      {event.desc && ':  ' + event.desc}
    </span>
  )
}

Events.propTypes = {
  event: PropTypes.object,
}
export default Events
