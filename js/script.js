// Ожидаем загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    // Получаем элементы
    const modal = document.getElementById('modal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.querySelector('.close');

    // Открытие модального окна
    openModalBtn.addEventListener('click', function () {
        modal.style.display = 'block';
    });

    // Закрытие модального окна при клике на крестик
    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его области
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Обработка телефона
    document.getElementById('phone').addEventListener('focus', function (e) {
        if (!e.target.value.startsWith('+7')) {
            e.target.value = '+7';
        }
    });

    document.getElementById('phone').addEventListener('input', function (e) {
        let x = e.target.value
            .replace(/\D/g, '')
            .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);

        e.target.value = '+7' 
            + (x[2] ? ' (' + x[2] : '') 
            + (x[3] ? ') ' + x[3] : '') 
            + (x[4] ? '-' + x[4] : '') 
            + (x[5] ? '-' + x[5] : '');
    });
});

// Функция для смены фоновых изображений
document.addEventListener('DOMContentLoaded', function() {
    const backgroundImages = document.querySelectorAll('.background-image');
    let currentIndex = 0;

    function changeBackground() {
        backgroundImages[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % backgroundImages.length;
        backgroundImages[currentIndex].classList.add('active');
    }

    setInterval(changeBackground, 5000);
});

// Мобильное меню
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar ul');

mobileMenu.addEventListener('click', () => {
    navbar.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.navbar ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

// Модальное окно для заказа
const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('openModalBtn');
const openModalBtnTop = document.getElementById('openModalBtnTop');
const closeModal = document.querySelector('.close');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

openModalBtnTop.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Обработка формы
const feedbackForm = document.getElementById('feedbackForm');
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('firstName').value;
    const phone = document.getElementById('phone').value;

    fetch('http://localhost:3333/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ firstName, phone })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Ваша заявка отправлена!');
            modal.style.display = 'none';
            feedbackForm.reset();
        } else {
            alert('Произошла ошибка при отправке заявки.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке заявки.');
    });
});

// Модальное окно для портфолио
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const modal = document.getElementById('modalP');
    const closeModalBtn = document.querySelector('.close-buttonP');
    const modalImage = document.querySelector('.modal-imageP');
    const modalText = document.querySelector('.modal-textP');
    const prevSlideBtn = document.querySelector('.prevP');
    const nextSlideBtn = document.querySelector('.nextP');
    let currentIndex = 0;
    let currentProjects = [];

    portfolioItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = item.getAttribute('data-category');
            currentProjects = projects[category];
            currentIndex = 0;
            renderSlider();
            modal.style.display = 'flex';
        });
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    prevSlideBtn.addEventListener('click', function() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentProjects.length - 1;
        renderSlider();
    });

    nextSlideBtn.addEventListener('click', function() {
        currentIndex = (currentIndex < currentProjects.length - 1) ? currentIndex + 1 : 0;
        renderSlider();
    });

    function renderSlider() {
        if (currentProjects.length > 0) {
            const project = currentProjects[currentIndex];
            modalImage.src = project.image;
            modalImage.alt = project.title;
            modalText.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
            `;
        }
    }
});

// Прокрутка с учетом высоты заголовка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offset = 80;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Обработчик для кнопки "Подробнее"
document.addEventListener('DOMContentLoaded', function() {
    const detailsButton = document.getElementById('detailsButton');
    const modalText = document.getElementById('modalText');
    const modal = document.getElementById('modalP');
    const closeModalBtn = document.querySelector('.close-buttonP');

    detailsButton.addEventListener('click', function() {
        modalText.classList.toggle('active');
        if (modalText.classList.contains('active')) {
            detailsButton.textContent = 'Скрыть';
        } else {
            detailsButton.textContent = 'Подробнее';
        }
    });

    closeModalBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        modalText.classList.remove('active');
        detailsButton.textContent = 'Подробнее';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            modalText.classList.remove('active');
            detailsButton.textContent = 'Подробнее';
        }
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const showMoreBtn = document.getElementById('showMoreBtn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Функция для обновления видимости карточек
    function updateVisibility() {
        // Определяем количество карточек, которые нужно показать изначально
        let initialItemsToShow = 4; // По умолчанию 4 карточки
        if (window.innerWidth <= 768) {
            initialItemsToShow = 2; // На мобильных устройствах показываем 2 карточки
        }

        // Скрываем все карточки, кроме первых initialItemsToShow
        portfolioItems.forEach((item, index) => {
            if (index >= initialItemsToShow) {
                item.classList.add('hidden');
            } else {
                item.classList.remove('hidden');
            }
        });

        // Обновляем текст кнопки
        if (initialItemsToShow === 2 && document.querySelectorAll('.portfolio-item.hidden').length > 0) {
            showMoreBtn.textContent = 'Показать еще';
        } else {
            showMoreBtn.textContent = 'Скрыть';
        }
    }

    // Вызываем функцию при загрузке страницы
    updateVisibility();

    // Обработчик нажатия на кнопку
    showMoreBtn.addEventListener('click', function () {
        const hiddenItems = document.querySelectorAll('.portfolio-item.hidden');

        if (hiddenItems.length > 0) {
            // Если есть скрытые карточки, показываем их
            hiddenItems.forEach(item => {
                item.classList.remove('hidden');
            });
            showMoreBtn.textContent = 'Скрыть';
        } else {
            // Если все карточки показаны, скрываем дополнительные
            portfolioItems.forEach((item, index) => {
                let initialItemsToShow = 4;
                if (window.innerWidth <= 768) {
                    initialItemsToShow = 2;
                }
                if (index >= initialItemsToShow) {
                    item.classList.add('hidden');
                }
            });
            showMoreBtn.textContent = 'Показать еще';
        }
    });

    // Обновляем видимость при изменении размера окна
    window.addEventListener('resize', updateVisibility);
});