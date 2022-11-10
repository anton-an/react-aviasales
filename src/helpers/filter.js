export default function filterTickets(filters, tickets) {
  const allTickets = JSON.parse(JSON.stringify(tickets))
  const filtered = []
  if (filters.all.isActive) return tickets

  if (filters.noTransfers.isActive)
    filtered.push(...allTickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 0)))
  if (filters.one.isActive)
    filtered.push(...allTickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 1)))
  if (filters.two.isActive)
    filtered.push(...allTickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 2)))
  if (filters.three.isActive)
    filtered.push(...allTickets.filter((ticket) => ticket.segments.every((segment) => segment.stops.length === 3)))
  return filtered
}
