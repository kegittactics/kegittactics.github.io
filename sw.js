const CACHE_NAME = 'george-holmes-racing-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/assets/styles/main.css',
    '/assets/scripts/main.js',
    '/assets/images/logo.png',
    'https://www.formula1.com/etc/designs/fom-website/fonts/F1Regular/Formula1-Regular.woff2',
    'https://www.formula1.com/etc/designs/fom-website/fonts/F1Bold/Formula1-Bold.woff2',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(CACHE_NAME)
        .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
});document.getElementById('bookingForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    
    const submitButton = form.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.button-text');
    const spinner = submitButton.querySelector('.loading-spinner');

    buttonText.classList.add('hidden');
    spinner.classList.remove('hidden');

    try {
        await emailjs.send(
            'YOUR_SERVICE_ID',
            'template_admin',
            {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                date: form.datetime.value,
                package: form.package.value,
                track: form.track.value,
                car: form.car.value,
                laps: form.laps.value
            }
        );

        closeBookingModal();
        document.getElementById('successModal').classList.remove('hidden');
        form.reset();
    } finally {
        buttonText.classList.remove('hidden');
        spinner.classList.add('hidden');
    }
});
