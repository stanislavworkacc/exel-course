const fruits = ['banana',
  'grapefruit',
  'banana',
  'grapefruit',
  'banana',
  'orange',
  'banana'
];

const sortFruits = (fruits) => {
  const obj = {};
  fruits.forEach(el => {
    if (!Object.prototype.hasOwnProperty.call(obj, el)) {
      obj[el] = 1;
    } else {
      obj[el] = obj[el] + 1;
    }
  })

  return Object.keys(obj).sort(function(a, b) {
    return obj[a] + obj[b]
  });
}
// console.log('sortFruits', sortFruits(fruits))
