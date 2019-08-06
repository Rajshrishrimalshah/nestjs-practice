export function logger(req, res, next) {
  // tslint:disable-next-line:no-console
  // tslint:disable-next-line:no-console
  console.log(
    ` Request... , ${req.method}, ${req.url}, ${new Date().toISOString()}`,
  );
  next();
}
