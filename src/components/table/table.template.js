const CODES = {
  A: 65,
  Z: 90
};

function toCell(_, col) {
  return `
    <div class="cell" contenteditable data-col="${col}"></div>
    `
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(idx, content) {
  const resizer = idx ? '<div class="row-resize" data-resize="row"></div>': '';

  return `
    <div class="row" data-type="resizable" data-row="${idx}">
    <div class="row-info">
        ${idx ? idx : ''}
        ${resizer}
    </div>
    <div class="row-data">${content}</div>
</div>
    `
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx);
}

export function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount).fill('').map(toChar)
      .map(toColumn).join('');

  rows.push(createRow(null, cols));
  for (let i = 0; i < rowsCount; i++) {
    const cell = new Array(rowsCount).fill('').map(toCell).join('');
    rows.push(createRow(i + 1, cell))
  }

  return rows.join('');
}
