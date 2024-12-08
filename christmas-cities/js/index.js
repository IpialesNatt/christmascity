window.addEventListener('scroll', function () {
  const SCROLLPOSITION = window.scrollY;
  const PARALLAXIMAGES = document.querySelectorAll('.parallax-img', '.item');
  PARALLAXIMAGES.forEach((img, index) => {

    const IMAGEPOSITION = img.getBoundingClientRect().top;


    if (IMAGEPOSITION <= window.innerHeight * 10) {
      const SPEED = (index + 1) * 0.5;
      const OFFSET = SCROLLPOSITION * SPEED;
      img.style.transform = `translateY(-${OFFSET}px)`;
    }
  });
  
});





