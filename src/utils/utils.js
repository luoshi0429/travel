export function getCookies() {
  const getCookie = document.cookie.replace(/[ ]/g, '');
  const arrCookie = getCookie.split(';');
  const obj = {};
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    obj[arr[0]] = obj[arr[1]];
  }
  return obj;
}

export function getCookieByKey(key) {
  const getCookie = document.cookie.replace(/[ ]/g, '');
  const arrCookie = getCookie.split(';');
  let tips;
  for (let i = 0; i < arrCookie.length; i++) {
    const arr = arrCookie[i].split('=');
    if (key === arr[0]) {
      tips = arr[1];
      break;
    }
  }
  return tips;
}

export function isPhone(str) {
  return /^1[3456789]\d{9}$/.test(str);
}
