document.querySelectorAll(".carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const slides = Array.from(track.children);
    const nextButton = carousel.querySelector(".carousel__button--rigth");
    const prevButton = carousel.querySelector(".carousel__button--left");
    const dotsNav = carousel.querySelector(".carousel__nav");
    const dots = Array.from(dotsNav.children);
  
    const slideSize = slides[0].getBoundingClientRect();
    const slideWidth = slideSize.width;
  
    const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + "px";
    };
    slides.forEach(setSlidePosition);
  
    const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = "translateX(-" + targetSlide.style.left + ")";
      currentSlide.classList.remove("current-slide");
      targetSlide.classList.add("current-slide");
    };
  
    const updateDots = (currentDot, targetDot) => {
      currentDot.classList.remove("current-slide");
      targetDot.classList.add("current-slide");
    };
  
    const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
      if (targetIndex === 0) {
        prevButton.classList.add("is_hidden");
        nextButton.classList.remove("is_hidden");
      } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove("is_hidden");
        nextButton.classList.add("is_hidden");
      } else {
        prevButton.classList.remove("is_hidden");
        nextButton.classList.remove("is_hidden");
      }
    };
  
    prevButton.addEventListener("click", () => {
      const currentSlide = track.querySelector(".current-slide");
      const prevSlide = currentSlide.previousElementSibling;
      const currentDot = dotsNav.querySelector(".current-slide");
      const prevDot = currentDot.previousElementSibling;
      const prevIndex = slides.findIndex((slide) => slide === prevSlide);
  
      moveToSlide(track, currentSlide, prevSlide);
      updateDots(currentDot, prevDot);
      hideShowArrow(slides, prevButton, nextButton, prevIndex);
    });
  
    nextButton.addEventListener("click", () => {
      const currentSlide = track.querySelector(".current-slide");
      const nextSlide = currentSlide.nextElementSibling;
      const currentDot = dotsNav.querySelector(".current-slide");
      const nextDot = currentDot.nextElementSibling;
      const nextIndex = slides.findIndex((slide) => slide === nextSlide);
  
      moveToSlide(track, currentSlide, nextSlide);
      updateDots(currentDot, nextDot);
      hideShowArrow(slides, prevButton, nextButton, nextIndex);
    });
  
    dotsNav.addEventListener("click", (e) => {
      const targetDot = e.target.closest("button");
  
      if (!targetDot) return;
  
      const currentSlide = track.querySelector(".current-slide");
      const currentDot = dotsNav.querySelector(".current-slide");
      const targetIndex = dots.findIndex((dot) => dot === targetDot);
      const targetSlide = slides[targetIndex];
  
      moveToSlide(track, currentSlide, targetSlide);
      updateDots(currentDot, targetDot);
      hideShowArrow(slides, prevButton, nextButton, targetIndex);
    });
  });