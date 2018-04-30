export const routeOption = (route, key, value) => {
  return route.matched.some(m => {
    if (process.browser) {
      return Object.values(m.components).some(component => component.options[key] === value)
    }
  })
}
