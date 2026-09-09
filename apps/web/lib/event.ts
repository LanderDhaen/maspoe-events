export const formatDateRange = (startDate: Date, endDate: Date) => {
  if (startDate.getTime() === endDate.getTime()) {
    return formatDate(startDate)
  }

  return `${formatDate(startDate)} - ${formatDate(endDate)}`
}

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
