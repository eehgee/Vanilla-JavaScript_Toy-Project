document.addEventListener("DOMContentLoaded", () => {
  // items의 요소를 모두 가져오기 위해 querySelectorAll 사용
  let listItem = document.querySelectorAll(".items");

  listItem.forEach((item) => {
    // 요소의 모든 부분이 움직여야 하므로 mousemove
    item.addEventListener("mousemove", (e) => {
      let horizon = e.offsetX;
      let vertical = e.offsetY;

      let rotateX = (3 / 35) * vertical - 10;
      let rotateY = (-1 / 10) * horizon + 10;
      item.style.transform = `perspective(300px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // 움직이 멈출 경우 mouseleave
    item.addEventListener("mouseleave", () => {
      item.style.transform = "rotateX(0deg) rotateY(0deg)";
    });
  });
});
