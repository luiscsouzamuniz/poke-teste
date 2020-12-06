export const incrementFirst = (first) => {
  return {
    type: 'INCREMENT_FIRST',
    first: first + 12,
  }
}