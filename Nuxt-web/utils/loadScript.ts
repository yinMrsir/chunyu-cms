const callbacks: any = {}

/**
 * 加载一个远程脚本
 * @param {String} src 一个远程脚本
 * @param {Function} callback 回调
 */
function loadScript(src: string, callback: { (): void; (): void }) {
  const existingScript = document.getElementById(src)
  const cb = callback || (() => {})
  if (!existingScript) {
    callbacks[src] = []
    const $script: HTMLScriptElement = document.createElement('script')
    $script.src = src
    $script.id = src
    $script.async = Boolean(1)
    document.body.appendChild($script)
    const onEnd = 'onload' in $script ? stdOnEnd.bind($script) : ieOnEnd.bind($script)
    // @ts-ignore
    onEnd($script)
  }

  callbacks[src].push(cb)

  function stdOnEnd(script: { onload?: () => void; onerror: () => void; }) {
    script.onload = () => {
      // @ts-ignore
      this.onerror = this.onload = null
      callbacks[src].forEach((item: (arg0: null, arg1: { onload?: (() => void) | undefined; onerror: () => void; }) => void) => {
        item(null, script)
      })
      delete callbacks[src]
    }
    script.onerror = () => {
      // @ts-ignore
      this.onerror = this.onload = null
      // @ts-ignore
      cb(new Error(`Failed to load ${src}`), script)
    }
  }

  function ieOnEnd(script: { onreadystatechange: () => void; }) {
    script.onreadystatechange = () => {
      // @ts-ignore
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
      // @ts-ignore
      this.onreadystatechange = null
      callbacks[src].forEach((item: (arg0: null, arg1: { onreadystatechange: () => void; }) => void) => {
        item(null, script)
      })
      delete callbacks[src]
    }
  }
}

/**
 * 顺序加载一组远程脚本
 * @param {Array} list 一组远程脚本
 * @param {Function} cb 回调
 */
export function loadScriptQueue(list: any[], cb: { (): void; (): void; }) {
  const first = list.shift()
  list.length ? loadScript(first, () => loadScriptQueue(list, cb)) : loadScript(first, cb)
}

export default loadScript
