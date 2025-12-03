export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc'
    },
    container: {
      base: 'max-w-2xl'
    },
    card: {
      slots: {
        header: 'flex flex-wrap items-center justify-between'
      },
      body: 'space-y-4'
    }
  }
})
