// 474. Protecting Routes With NextAuth Middleware
import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

/* import { NextResponse } from "next/server";
// 474. Protecting Routes With NextAuth Middleware
export function middleware(request) {
  // console.log(request);
  return NextResponse.redirect(new URL("/about", request.url));
} */

// request payload:
/*
  {
  cookies: RequestCookies {"authjs.csrf-token":{"name":"authjs.csrf-token","value":"158572b5fe6d14c91d98d1baf8645407f9e050f2290b664ac16f771983678ce1|b34ca72d04c3d6cdaa9f0dc13159ff0cab079e13f12e91b79159335f56b241ba"},"authjs.callback-url":{"name":"authjs.callback-url","value":"http://localhost:3000"},"authjs.session-token":{"name":"authjs.session-token","value":"eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoicnFiR0kya29GX3BiT2cxZnFNd1BkMWNZVE15TzFXN2xTTXpoX2pGYWs0TUc1NVBaT2hQcmhXUFBlbjNyOEpZMkNob0U2LXBZeW1FMTN4ajF4amZzaXcifQ..FLgFXG3RZ24jEgYz5Tj0Wg.duymeMHCNRElW5TK8CZxPZMA8cmlYP5rqvNBuBrUeh52MidHt-J5GQGtaB81u_kxq9Mp4Saf68x5ZnL-7s0S8Eh8npUAyZDOYz_WqnlxjioOMTUXikRCIwqB9ZJjEVUDTAGJ4MK06kS9ocmMq-4e8pzqhS0NG70gSwGZdtAyuAKVfWBT7L46PPH3bj-Awq3oEDucb-dqGTqxB1jkD0EaMK-mn4TGHslH1x_g8I0lUWmUcOUNapzaUzzfoyYbYpiz3tcZoYLr7zASvJj1NZdshD_yRwC3hD8B4fYAkjNNW8deXQW1jqcjNvk1VruegnAEhZ61dlx_T32vavC9K9gqwozBBSyxkKtcyttSqnaKJRQY78TEja790KdrZ0ZZiQ2NIq-uuy_zcRkjvKZKY0ve7A.TdOkLU1-0r-y6BGzmLjKEpIJg953PrShgiFt3o3MA_I"}},
  geo: {},
  ip: undefined,
  nextUrl: {
  href: 'http://localhost:3000/_next/static/chunks/app/error.js',
  origin: 'http://localhost:3000',
  protocol: 'http:',
  username: '',
  password: '',
  host: 'localhost:3000',
  hostname: 'localhost',
  port: '3000',
  pathname: '/_next/static/chunks/app/error.js',
  search: '',
  searchParams: URLSearchParams {  },
  hash: ''
},
  url: 'http://localhost:3000/_next/static/chunks/app/error.js',
  bodyUsed: false,
  cache: 'default',
  credentials: 'same-origin',
  destination: '',
  headers: {
  accept: '/*',
  accept-encoding: 'gzip, deflate, br, zstd',
  accept-language: 'en-IN,en;q=0.9,an;q=0.8,hi;q=0.7',
  connection: 'keep-alive',
  cookie: 'authjs.csrf-token=158572b5fe6d14c91d98d1baf8645407f9e050f2290b664ac16f771983678ce1%7Cb34ca72d04c3d6cdaa9f0dc13159ff0cab079e13f12e91b79159335f56b241ba; authjs.callback-url=http%3A%2F%2Flocalhost%3A3000; authjs.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoicnFiR0kya29GX3BiT2cxZnFNd1BkMWNZVE15TzFXN2xTTXpoX2pGYWs0TUc1NVBaT2hQcmhXUFBlbjNyOEpZMkNob0U2LXBZeW1FMTN4ajF4amZzaXcifQ..FLgFXG3RZ24jEgYz5Tj0Wg.duymeMHCNRElW5TK8CZxPZMA8cmlYP5rqvNBuBrUeh52MidHt-J5GQGtaB81u_kxq9Mp4Saf68x5ZnL-7s0S8Eh8npUAyZDOYz_WqnlxjioOMTUXikRCIwqB9ZJjEVUDTAGJ4MK06kS9ocmMq-4e8pzqhS0NG70gSwGZdtAyuAKVfWBT7L46PPH3bj-Awq3oEDucb-dqGTqxB1jkD0EaMK-mn4TGHslH1x_g8I0lUWmUcOUNapzaUzzfoyYbYpiz3tcZoYLr7zASvJj1NZdshD_yRwC3hD8B4fYAkjNNW8deXQW1jqcjNvk1VruegnAEhZ61dlx_T32vavC9K9gqwozBBSyxkKtcyttSqnaKJRQY78TEja790KdrZ0ZZiQ2NIq-uuy_zcRkjvKZKY0ve7A.TdOkLU1-0r-y6BGzmLjKEpIJg953PrShgiFt3o3MA_I',   
  host: 'localhost:3000',
  referer: 'http://localhost:3000/cabins/358',
  sec-ch-ua: '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
  sec-ch-ua-mobile: '?0',
  sec-ch-ua-platform: '"Windows"',
  sec-fetch-dest: 'script',
  sec-fetch-mode: 'no-cors',
  sec-fetch-site: 'same-origin',
  user-agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  x-forwarded-for: '::1',
  x-forwarded-host: 'localhost:3000',
  x-forwarded-port: '3000',
  x-forwarded-proto: 'http'
},
  integrity: '',
  keepalive: false,
  method: 'GET',
  mode: 'cors',
  redirect: 'follow',
  referrer: 'about:client',
  referrerPolicy: '',
  signal: AbortSignal {
  [Symbol(kEvents)]: SafeMap(0) {},
  [Symbol(events.maxEventTargetListeners)]: 10,
  [Symbol(events.maxEventTargetListenersWarned)]: false,
  [Symbol(kHandlers)]: SafeMap(0) {},
  [Symbol(kAborted)]: false,
  [Symbol(kReason)]: undefined,
  [Symbol(kOnabort)]: undefined,
  [Symbol(realm)]: {
  settingsObject: {
  baseUrl: undefined,
  origin: [Getter],
  policyContainer: { referrerPolicy: 'strict-origin-when-cross-origin' }  
}
}
}
}
*/
