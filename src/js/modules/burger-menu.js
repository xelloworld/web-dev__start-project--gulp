let unlock = true;

// === Переменные для бургер-меню ===
let iconMenu = document.querySelector(".burger-icon__button");
let menuHeader = document.querySelector(".menu__list");

// === Задержка ===
let delay = 500;

// === Вешаем событие на кнопку бургера ===
if (iconMenu != null) {
  iconMenu.addEventListener("click", function () {
    if (unlock) {
      body_lock(delay);
      iconMenu.classList.toggle("burger-icon__button_active-js");
      menuHeader.classList.toggle("menu__list_open-js");
    }
  });
};

// === Закрываем открытое меню по нажатию на кнопку ===
function menu_close() {
  iconMenu.classList.remove("burger-icon__button_active-js");
  menuHeader.classList.remove("menu__list_open-js");
};

// Закрываем открытое меню по нажатию в любом месте экрана
document.documentElement.addEventListener("click", function (e) {
  if (!e.target.closest('.burger-icon__button')) {
    body_lock_remove(delay);
    iconMenu.classList.remove('burger-icon__button_active-js');
    menuHeader.classList.remove('menu__list_open-js');
  }
});

// === Отключаем прокрутку контента под открытым меню ===
function body_lock(delay) {
  let body = document.querySelector("body");
  if (body.classList.contains('body-scroll-lock-js')) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    setTimeout(() => {
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = '0px';
      }
      body.style.paddingRight = '0px';
      body.classList.remove("body-scroll-lock-js");
    }, delay);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  let body = document.querySelector("body");
  if (unlock) {
    let lock_padding = document.querySelectorAll("._lp");
    for (let index = 0; index < lock_padding.length; index++) {
      const el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }
    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add("body-scroll-lock-js");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
