(function initTheme() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    setTheme(theme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const currentTheme = [...document.documentElement.classList]
    .find((cn) => cn.startsWith('theme-'))
    ?.replace('theme-', '');
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });

  adaptToScreenSize();
});

function setTheme(theme) {
  document.documentElement.className = '';
  document.documentElement.classList.add(`theme-${theme}`);
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
  if (target) {
    target.classList.add('header__theme-menu-button_active');
    target.setAttribute('disabled', true);
  } else {
    const autoButton = document.querySelector(
      '.header__theme-menu-button_type_auto'
    );
    autoButton.classList.add('header__theme-menu-button_active');
    autoButton.setAttribute('disabled', true);
  }
}

function adaptToScreenSize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  if (width === 1024 && height === 768) {
    document.documentElement.style.setProperty('--header-height', '768px');
    document.documentElement.style.setProperty('--footer-height', '768px');
  } else if (width === 768 && height === 1024) {
    document.documentElement.style.setProperty('--header-height', '1024px');
    document.documentElement.style.setProperty('--footer-height', '1024px');
  } else if (width === 375 && height === 668) {
    document.documentElement.style.setProperty('--min-block-size', '668px');
  }
}

window.addEventListener('resize', adaptToScreenSize);
window.addEventListener('load', adaptToScreenSize);