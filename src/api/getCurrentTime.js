export function getCurrentTime() {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  let d = date.getDate()
  let H = date.getHours()
  const mm = date.getMinutes()
  const s = date.getSeconds()
  m = m < 10 ? '0' + m : m
  d = d < 10 ? '0' + d : d
  H = H < 10 ? '0' + H : H
  return y + '-' + m + '-' + d + ' ' + H + ':' + mm + ':' + s
}
