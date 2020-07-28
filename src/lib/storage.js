export const getObject = (key) => {
  const str = localStorage.getItem(key)
  let obj = {}

  try {
    obj = JSON.parse(str) || {}
  } catch (err) { }

  return obj
}

export const setObject = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) { }
}