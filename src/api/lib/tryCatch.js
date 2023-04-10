export const tryCatch = async (fn, ...args) => {
  try {
    return await fn(...args)
  } catch (error) {
    return error.response
  }
}
