export const uppercaseFirstLetter = (letter?: string) => {
  if (typeof letter !== 'string') return letter
  return letter.slice(0, 1).toUpperCase() + letter.slice(1)
}
