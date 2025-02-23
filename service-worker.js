(()=>{"use strict";var e={295:()=>{try{self["workbox:core:7.2.0"]&&_()}catch(e){}},740:()=>{try{self["workbox:precaching:7.2.0"]&&_()}catch(e){}},130:()=>{try{self["workbox:routing:7.2.0"]&&_()}catch(e){}},205:()=>{try{self["workbox:strategies:7.2.0"]&&_()}catch(e){}}},t={};function s(n){var a=t[n];if(void 0!==a)return a.exports;var r=t[n]={exports:{}};return e[n](r,r.exports,s),r.exports}s(295);const n=function(e){let t=e;for(var s=arguments.length,n=new Array(s>1?s-1:0),a=1;a<s;a++)n[a-1]=arguments[a];return n.length>0&&(t+=` :: ${JSON.stringify(n)}`),t};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!==typeof registration?registration.scope:""},i=e=>[r.prefix,e,r.suffix].filter((e=>e&&e.length>0)).join("-"),c=e=>e||i(r.precache),o=e=>e||i(r.runtime);function h(e,t){const s=t();return e.waitUntil(s),s}s(740);function l(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"===typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:r.href}}class u{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async e=>{let{request:t,state:s}=e;s&&(s.originalRequest=t)},this.cachedResponseWillBeUsed=async e=>{let{event:t,state:s,cachedResponse:n}=e;if("install"===t.type&&s&&s.originalRequest&&s.originalRequest instanceof Request){const e=s.originalRequest.url;n?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return n}}}class d{constructor(e){let{precacheController:t}=e;this.cacheKeyWillBeUsed=async e=>{let{request:t,params:s}=e;const n=(null===s||void 0===s?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return n?new Request(n,{headers:t.headers}):t},this._precacheController=t}}let f;async function p(e,t){let s=null;if(e.url){s=new URL(e.url).origin}if(s!==self.location.origin)throw new a("cross-origin-copy-response",{origin:s});const n=e.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=t?t(r):r,c=function(){if(void 0===f){const t=new Response("");if("body"in t)try{new Response(t.body),f=!0}catch(e){f=!1}f=!1}return f}()?n.body:await n.blob();return new Response(c,i)}function g(e,t){const s=new URL(e);for(const n of t)s.searchParams.delete(n);return s.href}class y{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const w=new Set;s(205);function m(e){return"string"===typeof e?new Request(e):e}class v{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new y,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=m(e);if("navigate"===s.mode&&t instanceof FetchEvent&&t.preloadResponse){const e=await t.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))s=await e({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new a("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const r=s.clone();try{let e;e=await fetch(s,"navigate"===s.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:t,request:r,response:e});return e}catch(c){throw n&&await this.runCallbacks("fetchDidFail",{error:c,event:t,originalRequest:n.clone(),request:r.clone()}),c}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=m(e);let s;const{cacheName:n,matchOptions:a}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},a),{cacheName:n});s=await caches.match(r,i);for(const c of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await c({cacheName:n,matchOptions:a,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(e,t){const s=m(e);var n;await(n=0,new Promise((e=>setTimeout(e,n))));const r=await this.getCacheKey(s,"write");if(!t)throw new a("cache-put-with-no-response",{url:(i=r.url,new URL(String(i),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var i;const c=await this._ensureResponseSafeToCache(t);if(!c)return!1;const{cacheName:o,matchOptions:h}=this._strategy,l=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),d=u?await async function(e,t,s,n){const a=g(t.url,s);if(t.url===a)return e.match(t,n);const r=Object.assign(Object.assign({},n),{ignoreSearch:!0}),i=await e.keys(t,r);for(const c of i)if(a===g(c.url,s))return e.match(c,n)}(l,r.clone(),["__WB_REVISION__"],h):null;try{await l.put(r,u?c.clone():c)}catch(f){if(f instanceof Error)throw"QuotaExceededError"===f.name&&await async function(){for(const e of w)await e()}(),f}for(const a of this.iterateCallbacks("cacheDidUpdate"))await a({cacheName:o,oldResponse:d,newResponse:c.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let n=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))n=m(await e({mode:t,request:n,event:this.event,params:this.params}));this._cacheKeys[s]=n}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"===typeof t[e]){const s=this._pluginStateMap.get(t),n=n=>{const a=Object.assign(Object.assign({},n),{state:s});return t[e](a)};yield n}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const n of this.iterateCallbacks("cacheWillUpdate"))if(t=await n({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class R{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.cacheName=o(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"===typeof e.request?new Request(e.request):e.request,n="params"in e?e.params:void 0,a=new v(this,{event:t,request:s,params:n}),r=this._getResponse(a,s,t);return[r,this._awaitComplete(r,a,s,t)]}async _getResponse(e,t,s){let n;await e.runCallbacks("handlerWillStart",{event:s,request:t});try{if(n=await this._handle(t,e),!n||"error"===n.type)throw new a("no-response",{url:t.url})}catch(r){if(r instanceof Error)for(const a of e.iterateCallbacks("handlerDidError"))if(n=await a({error:r,event:s,request:t}),n)break;if(!n)throw r}for(const a of e.iterateCallbacks("handlerWillRespond"))n=await a({event:s,request:t,response:n});return n}async _awaitComplete(e,t,s,n){let a,r;try{a=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:n,request:s,response:a}),await t.doneWaiting()}catch(i){i instanceof Error&&(r=i)}if(await t.runCallbacks("handlerDidComplete",{event:n,request:s,response:a,error:r}),t.destroy(),r)throw r}}class C extends R{constructor(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};e.cacheName=c(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(C.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const n=t.params||{};if(!this._fallbackToNetwork)throw new a("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{0;const a=n.integrity,r=e.integrity,i=!r||r===a;if(s=await t.fetch(new Request(e,{integrity:"no-cors"!==e.mode?r||a:void 0})),a&&i&&"no-cors"!==e.mode){this._useDefaultCacheabilityPluginIfNeeded();await t.cachePut(e,s.clone());0}}return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new a("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,n]of this.plugins.entries())n!==C.copyRedirectedCacheableResponsesPlugin&&(n===C.defaultPrecacheCacheabilityPlugin&&(e=s),n.cacheWillUpdate&&t++);0===t?this.plugins.push(C.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}C.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate(e){let{response:t}=e;return!t||t.status>=400?null:t}},C.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate(e){let{response:t}=e;return t.redirected?await p(t):t}};class b{constructor(){let{cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new C({cacheName:c(e),plugins:[...t,new d({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){"string"===typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=l(s),r="string"!==typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!==typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return h(e,(async()=>{const t=new u;this.strategy.plugins.push(t);for(const[a,r]of this._urlsToCacheKeys){const t=this._cacheKeysToIntegrities.get(r),s=this._urlsToCacheModes.get(a),n=new Request(a,{integrity:t,cache:s,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:r},request:n,event:e}))}const{updatedURLs:s,notUpdatedURLs:n}=t;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(e){return h(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new a("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let q;const U=()=>(q||(q=new b),q);s(130);const L=e=>e&&"object"===typeof e?e:{handle:e};class k{constructor(e,t){let s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"GET";this.handler=L(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=L(e)}}class K extends k{constructor(e,t,s){super((t=>{let{url:s}=t;const n=e.exec(s.href);if(n&&(s.origin===location.origin||0===n.index))return n.slice(1)}),t,s)}}class T{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map((t=>{"string"===typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest(e){let{request:t,event:s}=e;const n=new URL(t.url,location.href);if(!n.protocol.startsWith("http"))return void 0;const a=n.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:s,request:t,sameOrigin:a,url:n});let c=i&&i.handler;const o=t.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return void 0;let h;try{h=c.handle({url:n,request:t,event:s,params:r})}catch(u){h=Promise.reject(u)}const l=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||l)&&(h=h.catch((async e=>{if(l){0;try{return await l.handle({url:n,request:t,event:s,params:r})}catch(a){a instanceof Error&&(e=a)}}if(this._catchHandler)return this._catchHandler.handle({url:n,request:t,event:s});throw e}))),h}findMatchingRoute(e){let{url:t,sameOrigin:s,request:n,event:a}=e;const r=this._routes.get(n.method)||[];for(const i of r){let e;const r=i.match({url:t,sameOrigin:s,request:n,event:a});if(r)return e=r,(Array.isArray(e)&&0===e.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"===typeof r)&&(e=void 0),{route:i,params:e}}return{}}setDefaultHandler(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET";this._defaultHandlerMap.set(t,L(e))}setCatchHandler(e){this._catchHandler=L(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let x;class P extends k{constructor(e,t){super((s=>{let{request:n}=s;const a=e.getURLsToCacheKeys();for(const r of function(e){let{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:a}=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function*(){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}()}(n.url,t)){const t=a.get(r);if(t){return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}}),e.strategy)}}function N(e){const t=U();!function(e,t,s){let n;if("string"===typeof e){const a=new URL(e,location.href);n=new k((e=>{let{url:t}=e;return t.href===a.href}),t,s)}else if(e instanceof RegExp)n=new K(e,t,s);else if("function"===typeof e)n=new k(e,t,s);else{if(!(e instanceof k))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}(x||(x=new T,x.addFetchListener(),x.addCacheListener()),x).registerRoute(n)}(new P(t,e))}var E;(function(e){U().precache(e)})([{'revision':'7cdc033a2054c3626f826c5459338927','url':'/volleyball/index.html'},{'revision':null,'url':'/volleyball/static/css/main.ecd1c354.css'},{'revision':null,'url':'/volleyball/static/js/453.8718dbb1.chunk.js'},{'revision':null,'url':'/volleyball/static/js/main.ffdf2819.js'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-300-normal.1b79538ccd585c259996.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-300-normal.5f077fd7b977d1715acf.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-400-normal.5d2930082227d172f62c.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-400-normal.a9e19870cf6c4b973427.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-500-normal.0ae2428323939af5e1ad.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-500-normal.dd7bc8a52c6c70c5a3f5.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-700-normal.3f6e1548bd5175a8c342.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-700-normal.4fdfc29a10e7d4b7c527.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-300-normal.795dbc8140e3fef82983.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-300-normal.80947a31d23c70204b47.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-400-normal.135d076fa32aa0b4d105.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-400-normal.5cec61a21cc20180fbe1.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-500-normal.6de16332fda843a3dc3d.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-500-normal.c0a0638f90b31d6454ba.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-700-normal.4750292c47fa2bc6ac1a.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-cyrillic-ext-700-normal.ca247189fc12d00de361.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-300-normal.285f3e6261d8eb20417d.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-300-normal.889beddda1c9bd9f97df.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-400-normal.160a791a8e4f46bca3cc.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-400-normal.2c32b1315be61477013a.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-500-normal.60810e07c7b0273013aa.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-500-normal.f95e757c5483310f9c11.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-700-normal.77dd370f2001e184ba0d.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-700-normal.df87b053fae3d7ad5f7a.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-300-normal.b590dbe5c639944366d1.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-300-normal.d6049cb54aa6fbe14c42.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-400-normal.16eb83b4a3b1ea994243.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-400-normal.1df4abad55796d11a0c8.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-500-normal.4a96ba31abcce0f5d52b.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-500-normal.fd28d9c008bf3af1bed7.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-700-normal.2dd6febad11502dec6a6.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-greek-ext-700-normal.4abdc9fff4507f17d726.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-300-normal.b850f1ff581ea232fac9.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-300-normal.c4bc0593c9954d79cb3a.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-400-normal.047a7839f69b209db815.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-400-normal.297d48e1b5a10c0831a9.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-500-normal.68d40d6d01c6f85d24ba.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-500-normal.7077203b1982951ecf76.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-700-normal.4535474e1cf8598695ad.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-700-normal.9f6a16a7770c87b2042b.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-300-normal.14982a9e4857a93b6dce.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-300-normal.97cbc447d4a8d41a9543.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-400-normal.27da5b36b6d3a16f53f4.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-400-normal.2eeae187764baf05867d.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-500-normal.06c30711d588145a4541.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-500-normal.9a18d7bb9ff7a6af7b32.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-700-normal.18841836e391d39e83a8.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-latin-ext-700-normal.3c5bcdd0e69c4c3ffafe.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-300-normal.c96b16e5c05c7b7c3e89.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-300-normal.f5e7cea32756dfe7af40.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-400-normal.0dc97c66f9b542d6fa17.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-400-normal.d3f8e26d6c27de8102b6.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-500-normal.090fabef926bdc0e9b9f.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-500-normal.23b7b8a2524d2d4b637b.woff'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-700-normal.0a79a9fabfc32e33f360.woff2'},{'revision':null,'url':'/volleyball/static/media/roboto-vietnamese-700-normal.35ed0597568ff6f19c16.woff'}]||[]),N(E);const O="my-pwa-cache-v1",M=["/","/index.html","/manifest.json"];self.addEventListener("install",(e=>{e.waitUntil(caches.open(O).then((e=>(console.log("Opened cache"),e.addAll(M)))))})),self.addEventListener("fetch",(e=>{e.respondWith(caches.match(e.request).then((t=>t||fetch(e.request))))})),self.addEventListener("activate",(e=>{const t=[O];e.waitUntil(caches.keys().then((e=>Promise.all(e.map((e=>{if(!t.includes(e))return caches.delete(e)}))))))}))})();
//# sourceMappingURL=service-worker.js.map