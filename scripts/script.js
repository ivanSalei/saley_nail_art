// Бургер меню
const burger = document.querySelector('.burger');
const navMenu = document.querySelector('.nav-menu');

if (burger && navMenu) {
    burger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        burger.classList.toggle('active');
    });

    // Закриття меню при кліку на посилання
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            burger.classList.remove('active');
        });
    });
}

// Плавна прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Спрощена маска для телефону
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.substring(0, 10);
        }
        e.target.value = value;
    });
}

// Обробка форми запису
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = document.getElementById('submitBtn');
        const formMessage = document.getElementById('formMessage');
        
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value.trim();
        
        if (!name || !phone || !service) {
            showMessage('Будь ласка, заповніть всі обов\'язкові поля', 'error');
            return;
        }
        
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length !== 10) {
            showMessage('Будь ласка, введіть коректний номер телефону (10 цифр)', 'error');
            return;
        }
        
        const formattedPhone = `+38 (${cleanPhone.substring(0, 3)}) ${cleanPhone.substring(3, 6)} ${cleanPhone.substring(6, 8)} ${cleanPhone.substring(8, 10)}`;
        
        submitBtn.disabled = true;
        submitBtn.textContent = 'Відправка...';
        
        const whatsappMessage = `💅 *Запис на манікюр* 💅
        
👤 *Ім'я:* ${name}
📞 *Телефон:* ${formattedPhone}
💅 *Послуга:* ${service}
${message ? `📝 *Побажання:* ${message}` : ''}

🕐 *Час запису:* ${new Date().toLocaleString('uk-UA')}`;

        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/380960608303?text=${encodedMessage}`;
        
        showMessage('Заявка успішно відправлена! Зараз ви будете перенаправлені в WhatsApp для підтвердження запису 💅', 'success');
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            this.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Відправити заявку';
        }, 2000);
    });
}

// Функція для показу повідомлень
function showMessage(text, type) {
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Галерея
const allGalleryImages = [
    './images/photo2.jpeg',
    './images/photo3.jpeg',
    './images/photo4.jpeg',
    './images/photo5.jpeg',
    './images/photo6.jpeg',
    './images/photo7.jpeg',
    './images/photo8.jpeg',
    './images/photo9.jpeg',
    './images/photo10.jpeg',
    './images/photo11.jpeg',
    './images/photo12.jpeg',
    './images/photo13.jpeg',
    './images/photo14.jpeg',
    './images/photo15.jpeg',
    './images/photo16.jpeg',
    './images/photo17.jpeg',
    './images/photo18.jpeg',
    './images/photo19.jpeg',
];

let currentImageIndex = 0;
let visibleImagesCount = 6;
const imagesPerLoad = 6;

// Функція для створення елементу фото
function createGalleryItem(imageSrc, index) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
        <img src="${imageSrc}" alt="Робота майстра ${index + 1}" loading="lazy">
    `;
    
    // Додаємо обробник кліку
    item.querySelector('img').addEventListener('click', () => {
        openGallery(index);
    });
    
    return item;
}

// Функція для завантаження фото в галерею
function loadGalleryImages() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;
    
    galleryGrid.innerHTML = '';

    // На мобільних показуємо всі фото одразу, на десктопі - по visibleImagesCount
    const isMobile = window.innerWidth <= 768;
    const imagesToShow = isMobile ? allGalleryImages : allGalleryImages.slice(0, visibleImagesCount);
    
    imagesToShow.forEach((imageSrc, index) => {
        const galleryItem = createGalleryItem(imageSrc, index);
        galleryGrid.appendChild(galleryItem);
    });

    // Перевіряємо чи потрібно показувати кнопку "Показати ще" (тільки для десктопу)
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        if (isMobile || visibleImagesCount >= allGalleryImages.length) {
            loadMoreBtn.classList.add('hidden');
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    }
}

// Функція "Показати ще" (тільки для десктопу)
function loadMorePhotos() {
    if (window.innerWidth > 768) {
        visibleImagesCount += imagesPerLoad;
        loadGalleryImages();
    }
}

// Модальне вікно галереї
function openGallery(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImage = document.getElementById('modalImage');
    
    if (modal && modalImage) {
        modalImage.src = allGalleryImages[index];
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
    document.getElementById('modalImage').src = allGalleryImages[currentImageIndex];
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
    document.getElementById('modalImage').src = allGalleryImages[currentImageIndex];
}

// Функція "Переглянути всі" - відкриває перше фото
function viewAllPhotos() {
    if (allGalleryImages.length > 0) {
        openGallery(0);
    }
}

// Закриття галереї по кліку на фон
function initGalleryModal() {
    const galleryModal = document.getElementById('galleryModal');
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeGallery();
            }
        });
    }
}

// Закриття по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeGallery();
        closeCertificateModal();
    }
});

// Темна тема в header
function initTheme() {
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle-header';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Перемкнути тему');
    
    // Додаємо кнопку в header
    const navRight = document.querySelector('.nav-right');
    if (navRight) {
        navRight.insertBefore(themeToggle, navRight.querySelector('.burger'));
    }

    // Перевіряємо збережену тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const themeToggle = document.querySelector('.theme-toggle-header');
    if (themeToggle) {
        themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    }
}

// Реакція на зміну розміру вікна
function handleResize() {
    loadGalleryImages();
}

// Анімація при скролі
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Спостерігаємо за елементами для анімації
    setTimeout(() => {
        document.querySelectorAll('.service-card, .gallery-item, .video-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }, 100);
}

// Функції для сертифікатів
function openCertificateModal(imageSrc) {
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('certificateModalImage');
    
    if (modal && modalImage) {
        modalImage.src = imageSrc;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Ініціалізація сертифікатів
function initCertificates() {
    const certificateModal = document.getElementById('certificateModal');
    if (certificateModal) {
        certificateModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeCertificateModal();
            }
        });
    }
}

// Ініціалізація кнопки "Показати ще"
function initLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMorePhotos);
    }
}

// Головна функція ініціалізації
function initApp() {
    loadGalleryImages();
    initTheme();
    initScrollAnimations();
    initLoadMoreButton();
    initGalleryModal();
    initCertificates();
    
    window.addEventListener('resize', handleResize);
}

// Запускаємо все при завантаженні сторінки
document.addEventListener('DOMContentLoaded', initApp);