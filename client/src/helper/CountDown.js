const convertMS = (ms) => {
  let d, h, m, s;
  s = Math.floor(ms / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  return d + ' days, ' + h + ' hrs, ' + m + ' mins ' + s + ' secs ';
};

export { convertMS };
