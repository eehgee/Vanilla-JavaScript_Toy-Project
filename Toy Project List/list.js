document.addEventListener("DOMContentLoaded", () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  const carousel = get(".carousel");
  const prebtn = get("#preBtn");
  const nextbtn = get("#nextBtn");

  // rotateY 변수 설정
  let rotateY = 0;

  // 이전 버튼 click
  prebtn.addEventListener("click", () => {
    rotateY += 60;
    carousel.style.transform = `translateZ(-389px) rotateY(${rotateY}deg)`;
  });

  // 다음 버튼 click
  nextbtn.addEventListener("click", () => {
    rotateY -= 60;
    carousel.style.transform = `translateZ(-389px) rotateY(${rotateY}deg)`;
  });
});
