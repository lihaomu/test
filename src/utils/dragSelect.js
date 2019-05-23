export default {
    inserted (el, { value }, vnode) {
        let self = vnode.context
        let div = document.createElement('div')

        div.className = `${self.$LEO.prefix}-drag-select`
        el.appendChild(div)

        let ignore = true
        let elements = []
        let [startX, startY] = [0, 0]

        const mousedownHandler = e => {
            [startX, startY] = [e.clientX, e.clientY]

            ignore = false
            div.classList.add('visible')
        }
        const mousemoveHandler = e => {
            if (ignore) return
            elements = []

            const width = e.clientX - startX
            const height = e.clientY - startY
            const left = width > 0 ? startX : e.clientX
            const top = height > 0 ? startY : e.clientY
            const right = Math.abs(width) + left
            const bottom = Math.abs(height) + top
            const selectors = document.querySelectorAll(value.selector)

            div.style.top = `${top}px`
            div.style.left = `${left}px`
            div.style.width = `${Math.abs(width)}px`
            div.style.height = `${Math.abs(height)}px`

            for (let i = 0; i < selectors.length; i++) {
                const rect = selectors[i].getBoundingClientRect()
                const isIntersect = !(
                    rect.top > bottom ||
                    rect.bottom < top ||
                    rect.right < left ||
                    rect.left > right
                )

                isIntersect && elements.push(selectors[i])
                selectors[i].classList[isIntersect ? 'add' : 'remove'](
                    ...value.className)
            }
        }
        const mouseupHandler = () => {
            if (ignore) return

            ignore = true
            div.classList.remove('visible')
            self.dragSelected && self.dragSelected(elements)
            setTimeout(() => { div.style.cssText = '' }, 500)
        }

        el.__mouseup = mouseupHandler
        el.__mousemove = mousemoveHandler
        el.__mousedown = mousedownHandler
        el.addEventListener('mousemove', mousemoveHandler)
        el.addEventListener('mousedown', mousedownHandler)
        window.addEventListener('mouseup', mouseupHandler)
    },
    unbind (el, {}, vnode) {
        let self = vnode.context
        let node = document.querySelector(
            `div.${self.$LEO.prefix}-drag-select`)
        el.removeChild(node)

        el.removeEventListener('mousemove', el.__mousemove)
        el.removeEventListener('mousedown', el.__mousedown)
        window.removeEventListener('mouseup', el.__mouseup)

        delete el.__mouseup
        delete el.__mouseout
        delete el.__mouseover
    }
}