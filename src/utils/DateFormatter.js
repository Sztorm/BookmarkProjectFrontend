const DateFormatter = {
    getFormatted: date => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const day = date.getDate()
        const hour = date.getHours()
        const min = date.getMinutes()
        const monthFormat = month < 10 ? '0' + month : month
        const dayFormat = day < 10 ? '0' + day : day
        const hourFormat = hour < 10 ? '0' + hour  : hour
        const minFormat = min < 10 ? '0'+ min : min

        return `${year}-${monthFormat}-${dayFormat} ${hourFormat}:${minFormat}`
    }
}
export default DateFormatter
