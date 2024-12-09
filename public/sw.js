importScripts('https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js');
importScripts ('js/sw-utils.js');
importScripts ('js/sw-bd.js');

importScripts('firebase-messaging-sw.js');

//Creación del appShell
const cacheStatic = 'static-v1'
const cacheDynamic = 'dynamic-v1'
const cacheInmutable = 'inmutable-v1'

const limpiarCache = (cacheName, numberItem) => {
caches.open(cacheName)
.then(cache => {
cache.keys()
.then(keys => {
if (keys.length > numberItem) {
cache.delete(keys[0])
.then(limpiarCache(cacheName, numberItem))
}
})
})

}
self.addEventListener('install', event => {

const cacheEstatico = caches.open(cacheStatic)
.then(cache => {
return cache.addAll([
'/',
'/index.html',
'/js/app.js',
'/sw.js',
'/assets/index-DiwrgTda.css',
'/assets/index-DWNzKSXA.js',
'/assets/notFound.png',
'/js/sw-db.js',
'/js/sw-utils.js',
'/vite.svg'
])
})
const caheInmutable2 = caches.open(cacheInmutable).then(cache => {

return cache.addAll([

'https://cdn.jsdelivr.net/npm/pouchdb@9.0.0/dist/pouchdb.min.js',
'https://www.gstatic.com/firebasejs/11.0.2/firebase-app-compat.js',
'https://www.gstatic.com/firebasejs/11.0.2/firebase-messaging-compat.js'

])
})
event.waitUntil(Promise.all([cacheEstatico, caheInmutable2]))
})



self.addEventListener('fetch', event => {
  let respuesta 

  if(event.request.url.includes('____________-')){
    respuesta = manejoApiNotas(CACHE_DYNAMIC, event.request)
  }else{
    respuesta = caches.match(event.request).then(res => {
      if(res){
        actualizaCacheStatic(CACHE_STATIC, event.request, CACHE_INMUTABLE);
        return res;
      }else{
        return fetch(event.request).then(newRes => {

          return actualizaCacheDinamico(CACHE_DYNAMIC, event.request, newRes);
        });
      }
    });
  }
});

