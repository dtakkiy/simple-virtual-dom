import { diff } from './diff.js'
import { renderNode } from './renderNode.js'
import { patch } from './patch.js'

// ブラウザ表示中のオブジェクト
let currentVDOM = null

const render = (vDOM) => {
  if (currentVDOM === null) {
    currentVDOM = JSON.parse(JSON.stringify(vDOM))
    const realElement = renderNode(vDOM)
    document.body.appendChild(realElement)
  }

  const patchTargets = diff(currentVDOM, vDOM)
  if (typeof patchTargets !== 'undefined') {
    patchTargets.forEach((patchTargets) => {
      patch(patchTargets)
    })
  }

  currentVDOM = JSON.parse(JSON.stringify(vDOM))
}

export default { render }
