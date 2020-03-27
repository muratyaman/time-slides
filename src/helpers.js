//const locale = 'en-GB';

export const ts = () => {
  const d = new Date();
  return d.toISOString();//toLocaleTimeString(locale);
};

export const lg = (...args) => {
  // TODO: no logging on production
  args.unshift(ts());
  console.log.apply(null, args);
};

//export const asyncSleep = time => new Promise(resolve => setTimeout(resolve, time));
// call: await asyncSleep(3000);// sleep for 3 seconds, for synch style coding
