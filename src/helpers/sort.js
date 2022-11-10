export default function sortTicketss(sortIds, tickets) {
  const allTickets = JSON.parse(JSON.stringify(tickets))
  sortIds.forEach((id) => {
    if (id === 'cheapest') {
      allTickets.sort((ticket1, ticket2) => ticket1.price - ticket2.price)
    }
    if (id === 'fastest')
      allTickets.sort(
        (ticket1, ticket2) =>
          ticket1.segments.reduce((acc, segment) => acc + segment.duration, 0) -
          ticket2.segments.reduce((acc, segment) => acc + segment.duration, 0)
      )
    if (id === 'optimal')
      allTickets.sort(
        (ticket1, ticket2) =>
          ticket1.segments.reduce((acc, segment) => acc + segment.duration, 0) +
          ticket1.price -
          (ticket2.segments.reduce((acc, segment) => acc + segment.duration, 0) + ticket2.price)
      )
  })
  return allTickets
}
