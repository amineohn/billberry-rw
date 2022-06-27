import { useCallback, useState, useMemo } from 'react'

import { CalendarIcon } from '@heroicons/react/outline'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/solid'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'

import { navigate, routes } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { EDIT_TASK_QUERY } from 'src/components/Task/Tasks/Tasks'

import Alert from '../Alert'
import MyEvent from '../Events'
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
const Calenda = ({ tasks }: Props) => {
  const formatDate = (startTimed) => {
    const time = new Date(startTimed)
    const date = new Date(time.setHours(time.getHours()))
    return date
  }
  const UPDATE_TASK_MUTATION = gql`
    mutation UpdateTaskMutation($id: Int!, $input: UpdateTaskInput!) {
      updateTask(id: $id, input: $input) {
        id
        start
        end
      }
    }
  `
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    onCompleted: () => {
      toast.success('Task updated')
      navigate(routes.tasks())
    },
    //onQueryUpdated: () => {},
    onError: (error) => {
      toast.error(error.message)
    },
    refetchQueries: [{ query: EDIT_TASK_QUERY }],
    awaitRefetchQueries: true,
  })
  const localize = momentLocalizer(moment)
  const DnDCalendar = withDragAndDrop(Calendar)
  const onSave = (
    input: { id: number; start: string; end: string },
    id: number
  ) => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectEvent = useCallback((event) => {
    return (
      <Alert
        title={'cc'}
        content={<p className="text-sm text-gray-500"></p>}
        buttonText={'cc2'}
        type={'button'}
        closeModal={() => false}
        isOpen={true}
      />
    )
    //navigate(routes.editTask({ id: event.id }))
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (date: Date) => ({
      /*...(moment(date).day() === 2 && {
        className: '!bg-yellow-500/50',
      }),*/
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
    <>
      <DnDCalendar
        localizer={localize}
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
    </>
  )
}
export default Calenda
