async function loggerMiddleware(resolve, parent, args, context, info) {
  console.log('loggerMiddleware: ');
  return resolve(parent, args, context, info);
}

module.exports = [loggerMiddleware];