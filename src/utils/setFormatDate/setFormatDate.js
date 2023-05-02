import { DateTime } from 'luxon'
export const setFormat = (date) => {
  const d = DateTime.fromISO(date).toFormat('yyyy-LL-dd')
  return d

}

