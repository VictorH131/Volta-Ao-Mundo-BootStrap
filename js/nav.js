const button = document.getElementById('navbarSideCollapse');
  const menu = document.getElementById('navbarsExampleDefault');

  button.addEventListener('click', () => {
    menu.classList.toggle('open');
  });