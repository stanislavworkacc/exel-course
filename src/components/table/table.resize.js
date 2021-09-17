import {$} from '@core/dom';

export function tableResizeHandler($root, event) {
  const type = event.target.dataset.resize;
  if (type) {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();
    let value;
    const isHeigth = type === 'row' ? 'height': 'width';
    // eslint-disable-next-line max-len
    const cells = $root.findAll(`[data-${event.target.dataset.resize}="${$parent.data[type]}"]`);

    $resizer.css({
      opacity: 1,
      zIndex: 1000,
      [type === 'col' ? 'bottom': 'right']: '-5000px'
    });

    document.onmousemove = e => {
      // eslint-disable-next-line max-len
      const delta = Math.floor( (type === 'row' ? e.pageY : e.pageX) - (type === 'row' ? coords.bottom : coords.right));
      value = coords[isHeigth] + delta;
      $resizer.css({[type === 'col' ? 'right': 'bottom']: -delta + 'px'})
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      $parent.css({[isHeigth]: value + [isHeigth] + 'px'})
      cells.forEach(el => el.style[isHeigth] = value + 'px');

      $resizer.css({
        opacity: 0,
        bottom: 0,
        [type === 'col' ? 'right': 'bottom']: '0'
      });
    }
  }
}
