import { format, parseISO, addMinutes, intervalToDuration } from 'date-fns'

const getFlightTime = (date, duration) => {
  const originDate = parseISO(date)
  const destinationDate = addMinutes(originDate, duration)
  const flightPeriod = `${format(originDate, 'HH:mm')} - ${format(destinationDate, 'HH:mm')}`
  const { days, hours, minutes } = intervalToDuration({ start: originDate, end: destinationDate })
  const flightTime = `${days * 24 + hours}ч ${minutes ? `${minutes}м` : ''}`
  const result = { flightPeriod, flightTime }
  return result
}

export default getFlightTime
