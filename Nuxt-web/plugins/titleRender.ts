export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()
  return {
    provide: {
      titleRender: (msg: string) => `${msg} - ${runtimeConfig.public.globalTitle}`
    }
  }
})

declare module '#app' {
  interface NuxtApp {
    $titleRender: string
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $titleRender(msg: string): string
  }
}
