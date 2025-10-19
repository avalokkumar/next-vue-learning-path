import type { Directive } from 'vue'

interface TooltipElement extends HTMLElement {
  _tooltip?: HTMLDivElement
}

export const vTooltip: Directive = {
  mounted(el: TooltipElement, binding) {
    const tooltip = document.createElement('div')
    tooltip.className = 'v-tooltip'
    tooltip.textContent = binding.value
    tooltip.style.cssText = `
      position: absolute;
      background: #333;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.875rem;
      white-space: nowrap;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s;
    `
    
    document.body.appendChild(tooltip)
    
    el.addEventListener('mouseenter', () => {
      const rect = el.getBoundingClientRect()
      tooltip.style.top = `${rect.bottom + 8}px`
      tooltip.style.left = `${rect.left + rect.width / 2}px`
      tooltip.style.transform = 'translateX(-50%)'
      tooltip.style.opacity = '1'
    })
    
    el.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0'
    })
    
    el._tooltip = tooltip
  },
  
  updated(el: TooltipElement, binding) {
    if (el._tooltip) {
      el._tooltip.textContent = binding.value
    }
  },
  
  unmounted(el: TooltipElement) {
    if (el._tooltip) {
      el._tooltip.remove()
    }
  }
}
