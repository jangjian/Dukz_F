new Swiper('.swiper', {
  // slidesPerView: 1.2, // 한번에 보여줄 슬라이드 개수
  spaceBetween: -50, // 슬라이드 사이 여백
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  slideToClickedSlide: true // 해당 슬라이드 클릭시 슬라이드 위치로 이동
});

new Swiper('.swiper2', {
  slidesPerView: 2, // 한번에 보여줄 슬라이드 개수
  spaceBetween: 0, // 슬라이드 사이 여백
  centeredSlides: false, // 1번 슬라이드가 가운데 보이기
  freeMode: true,
});
