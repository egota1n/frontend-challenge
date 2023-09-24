// Находим контейнер .section__cats .container
const container = document.querySelector('.section__cats .container');

// Переменная для отслеживания активной вкладки
let isFavoritesTabActive = false;

// Функция для загрузки и отображения изображения с Cat API
async function loadCatImage() {
    try {
        if (isFavoritesTabActive) {
            // Если активна вкладка "Избранные", просто завершаем функцию без загрузки изображений
            return;
        }

        // Отправляем GET-запрос к Cat API
        const response = await fetch('https://api.thecatapi.com/v1/images/search?api_key=live_TBVgi2coc46onh0KOuvDluv5DqStLwlgNrFPWEkwHqW9AyMFeEkXGcdHekQCc9VW');
        const data = await response.json();

        // Извлекаем URL изображения из ответа
        const imageUrl = data[0].url;

        // Создаем элементы карточки
        const catElement = document.createElement('div');
        catElement.classList.add('section__cats-cat');

        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Cat Image';

        const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgElement.setAttribute('width', '40');
        svgElement.setAttribute('height', '37');
        svgElement.setAttribute('viewBox', '0 0 40 37');
        svgElement.setAttribute('fill', 'none');

        const pathElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathElement.setAttribute('d', 'M18.4464 32.581L18.4435 32.5784C13.2532 27.8719 9.10769 24.1077 6.2356 20.5963C3.38649 17.1129 2 14.123 2 11C2 5.94457 5.94457 2 11 2C13.8744 2 16.6645 3.34787 18.4773 5.47668L20 7.26481L21.5227 5.47668C23.3355 3.34787 26.1256 2 29 2C34.0554 2 38 5.94457 38 11C38 14.1231 36.6135 17.1131 33.764 20.5993C30.8917 24.1133 26.7464 27.8822 21.5564 32.5985C21.5559 32.599 21.5554 32.5994 21.5549 32.5999L20.0051 34L18.4464 32.581Z');
        pathElement.setAttribute('fill', '#F24E1E');
        pathElement.setAttribute('stroke', '#F24E1E');
        pathElement.setAttribute('stroke-width', '4');

        // Добавляем элементы в иерархию
        svgElement.appendChild(pathElement);
        catElement.appendChild(imgElement);
        catElement.appendChild(svgElement);

        // Добавляем catElement в контейнер
        container.appendChild(catElement);

        // Добавляем слушатель события клика на созданный элемент
        svgElement.addEventListener('click', function () {
            // Добавляем класс "favorites" к родительскому элементу div
            catElement.classList.toggle('favorites');

            if (isFavoritesTabActive) {
                catElement.style.display = 'none';
            }
        });
    } catch (error) {
        console.error('Произошла ошибка при загрузке изображения:', error);
    }
}

// Загружаем и отображаем 15 изображений при загрузке страницы
for (let i = 0; i < 15; i++) {
    loadCatImage();
}

// Добавляем обработчик события прокрутки окна
window.addEventListener('scroll', function () {
    const scrollY = window.scrollY; // текущая позиция прокрутки
    const windowHeight = window.innerHeight; // высота видимой области окна
    const documentHeight = document.documentElement.scrollHeight; // высота всего документа

    // Если прокрутили до нижней части страницы и активная вкладка "Все котики", загружаем еще изображений
    if (scrollY + windowHeight >= documentHeight && !isFavoritesTabActive) {
        for (let i = 0; i < 5; i++) {
            loadCatImage();
        }
    }
});

// Находим ссылку, на которую будем нажимать
const fav = document.querySelector('.header_link-fav');
// Находим ссылку, на которую будем нажимать
const all = document.querySelector('.header_link-all');

// Функция для скрытия элементов
function hideCatElements() {
    isFavoritesTabActive = true; // Устанавливаем флаг активной вкладки в "Избранные"

    const elementWrappers = document.querySelectorAll('.section__cats-cat:not(.favorites)');
    const section__more = document.querySelector('.section__more-desc');
    console.log(section__more)

    elementWrappers.forEach(function (element) {
        element.style.display = 'none';
    });

    section__more.style.display = 'none';
}

// Функция для показа элементов
function vissibleCatElements() {
    isFavoritesTabActive = false; // Сбрасываем флаг активной вкладки

    const elementWrappers = document.querySelectorAll('.section__cats-cat');
    const section__more = document.querySelector('.section__more-desc');

    elementWrappers.forEach(function (element) {
        element.style.display = '';
    });

    section__more.style.display = '';
}

// Добавляем слушатель события клика на ссылку "Избранные"
fav.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    fav.classList.toggle('active');
    all.classList.toggle('active');
    hideCatElements(); // Вызываем функцию для скрытия элементов
});

// Добавляем слушатель события клика на ссылку "Все котики"
all.addEventListener('click', function (event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    fav.classList.toggle('active');
    all.classList.toggle('active');
    vissibleCatElements(); // Вызываем функцию для показа элементов
});