console.log('MODULE.js');


async function start() {
  return await Promise.resolve('Async working');
}

start().then(console.log);
