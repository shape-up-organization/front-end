import i18n from 'i18next'

const { language } = i18n

const formatDate = date =>
  date?.toLocaleDateString(language, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

const formatDateTime = date =>
  date
    ?.toLocaleString(language, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })
    .replace(/, /g, ' - ')

const getLocalDate = () => new Date()

const getLocalDateFormatted = () => formatDate(getLocalDate())

const getLocalDateTimeFormatted = () => formatDateTime(getLocalDate())

const reformatSimpleDate = date => date?.split(' - ')[0]

const reformatSimpleTime = date => date?.split(' - ')[1]?.slice(0, -3)

const formatLocalDate = date => formatDateTime(new Date(date))

export {
  getLocalDateFormatted,
  getLocalDateTimeFormatted,
  formatLocalDate,
  reformatSimpleDate,
  reformatSimpleTime,
}
