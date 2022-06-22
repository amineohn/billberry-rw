import { useCallback, useMemo, useState } from 'react'

import { CalendarIcon } from '@heroicons/react/outline'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import MyEvent from 'src/components/Events'
import { QUERY } from 'src/components/Task/TasksCell'

const DELETE_TASK_MUTATION = gql`
  mutation DeleteTaskMutation($id: Int!) {
    deleteTask(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

const timeTag = (datetime) => {
  return (
    datetime && (
      <time dateTime={datetime} title={datetime}>
        {new Date(datetime).toUTCString()}
      </time>
    )
  )
}
const formatDate = (startTimed) => {
  const time = new Date(startTimed)
  const date = new Date(time.setHours(time.getHours()))
  return date
}

interface Props {
  tasks: [
    {
      id: number
      plannedAt: string
      workerId: number
      customerId: number
      siteId: number
      containerId: number
      serviceId: number
      equipmentId: number
      materialId: number
      worker: {
        name: string
      }
      customer: {
        name: string
      }
      site: {
        name: string
      }
      service: {
        name: string
      }
      container: {
        name: string
      }
      material: {
        name: string
      }
      start: string
      end: string
    }
  ]
}
const TasksList = ({ tasks }: Props) => {
  moment.locale('fr')
  const EDIT_TASK_QUERY = gql`
    query EditTaskById($id: Int!) {
      task: task(id: $id) {
        id
        plannedAt
        start
        end
        title
        workerId
        customerId
        siteId
        containerId
        materialId
        serviceId
      }
    }
  `
  const UPDATE_TASK_MUTATION = gql`
    mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
      updateTask(id: $id, input: $input) {
        id
        start
        end
      }
    }
  `

  const localizer = momentLocalizer(moment)
  const DnDCalendar = withDragAndDrop(Calendar)
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.tasks())
    },
    onQueryUpdated: () => {},
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: EDIT_TASK_QUERY }],
    awaitRefetchQueries: true,
  })
  const onSave = (input, id) => {
    const castInput = Object.assign(input, {
      id: input.id,
      start: formatDate(input.start),
      end: formatDate(input.end),
    })
    updateTask({ variables: { id, input: castInput } }).then((r) =>
      console.log(r)
    )
  }
  const lycos = tasks.map((task) => {
    return {
      id: task.id,
      title: task.worker?.name,
      serviceName: task.service?.name,
      customerName: task.customer?.name,
      siteName: task.site?.name,
      containerName: task.container?.name,
      materialName: task.material?.name,
      workerName: task.worker?.name,
      start: formatDate(task.start),
      end: formatDate(task.end),
    }
  })
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task deleted')
    },
    onError: (error) => {
      toast.error(error.message)
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete task ' + id + '?')) {
      deleteTask({ variables: { id } })
    }
  }
  const [events, setEvents] = useState(lycos)
  const [draggedEvent, setDraggedEvent] = useState()
  const [counters, setCounters] = useState(lycos)
  const moveEvent = useCallback(
    ({
      event,
      start,
      end,
      resourceId,
      isAllDay: droppedOnAllDaySlot = false,
    }) => {
      const { allDay } = event
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true
      }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end, resourceId, allDay }]
      })
      const id = event.id
      onSave({ id, start, end }, id)
    },
    [setEvents]
  )

  const customOnDragOver = useCallback(
    (dragEvent) => {
      if (draggedEvent !== 'undroppable') {
        dragEvent.preventDefault()
      }
    },
    [draggedEvent]
  )
  const newEvent = useCallback(() => {
    setEvents((prev) => {
      navigate(routes.newTask())
      return [...prev]
    })
  }, [setEvents])
  const formatName = (name, count) => `${name} ID ${count}`

  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }) => {
      if (draggedEvent === 'undroppable') {
        setDraggedEvent(null)
        return
      }

      const { name } = draggedEvent
      const lycos = {
        title: formatName(name, counters[name]),
        start,
        end,
        isAllDay,
      }
      setDraggedEvent(null)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      newEvent(lycos)
    },

    [draggedEvent, counters, setDraggedEvent, setCounters, newEvent]
  )

  const handleSelectEvent = useCallback((event) => {
    navigate(routes.editTask({ id: event.id }))
  }, [])
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {}
        const filtered = prev.filter((ev) => ev.id !== event.id)
        return [...filtered, { ...existing, start, end }]
      })
      const id = event.id
      onSave({ id, start, end }, id)
    },
    [setEvents]
  )
  const eventPropGetter = useCallback(
    (event, start, end, isSelected) => ({
      ...(isSelected && {
        style: {
          className: '!bg-red-500',
        },
      }),
      ...(moment(start).hour() < 12 && {
        className: '!bg-blue-500',
      }),
      ...(event.title.includes('hey') && {
        className: '!bg-green-500',
      }),
      ...(event.title.includes('bdx1') && {
        className: '!bg-purple-500',
      }),
    }),
    []
  )
  const dayPropGetter = useCallback(
    (date) => ({
      ...(moment(date).day() === 2 && {
        className: '!bg-yellow-500/50',
      }),
      ...(moment(date).day() === 4 && {
        className: '!bg-purple-500/50 !text-white',
        color: 'white',
      }),
    }),
    []
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps,@typescript-eslint/ban-ts-comment
  // @ts-ignore
  const components = useMemo(() => ({
    event: MyEvent,
    defaultDate: new Date(),
  }))
  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <DnDCalendar
        localizer={localizer}
        the={true}
        events={events}
        startAccessor="start"
        endAccessor="end"
        views={['month', 'work_week', 'day']}
        selectable={true}
        onDropFromOutside={onDropFromOutside}
        onDragOver={customOnDragOver}
        onEventDrop={moveEvent}
        onEventResize={resizeEvent}
        eventPropGetter={eventPropGetter}
        onSelectEvent={handleSelectEvent}
        resizable={true}
        onSelectSlot={newEvent}
        messages={{
          next: <ArrowRightIcon className="w-5 h-5" />,
          previous: <ArrowLeftIcon className="w-5 h-5" />,
          today: <CalendarIcon className="w-5 h-5" />,
          month: 'Mois',
          week: 'Semaine',
          day: 'Jour',
          showMore: (total) => `${total} tâches`,
          showMoreTooltip: (total) => `+${total} tâches`,
          prev: <ArrowLeftIcon className="w-5 h-5" />,
          work_week: 'Semaine de travail',
        }}
        defaultDate={moment().toDate()}
        showMultiDayTimes={true}
        showAllEvents={false}
        dayPropGetter={dayPropGetter}
        components={components}
        popup={true}
      />
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Planned at</th>
            <th>Worker id</th>
            <th>Customer id</th>
            <th>Site id</th>
            <th>Container id</th>
            <th>Material id</th>
            <th>Service id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{truncate(task.id)}</td>
              <td>{timeTag(task.plannedAt)}</td>
              <td>{truncate(task.workerId)}</td>
              <td>{truncate(task.customerId)}</td>
              <td>{truncate(task.siteId)}</td>
              <td>{truncate(task.containerId)}</td>
              <td>{truncate(task.materialId)}</td>
              <td>{truncate(task.serviceId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.task({ id: task.id })}
                    title={'Show task ' + task.id + ' detail'}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editTask({ id: task.id })}
                    title={'Edit task ' + task.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={'Delete task ' + task.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(task.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TasksList
