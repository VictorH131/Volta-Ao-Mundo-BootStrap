const bg = document.querySelector('.parallax-bg');

  window.addEventListener('scroll', () => {
    let scrollY = window.scrollY;

    
   bg.style.transform = `translateY(${scrollY * 0.25}px)`;
  });