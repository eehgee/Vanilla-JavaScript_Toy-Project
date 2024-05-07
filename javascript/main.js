document.addEventListener("DOMContentLoaded", () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  // progressbar
  let bar = get(".bar");

  function throttle(func, delay) {
    let timerId;
    return function (...args) {
      if (!timerId) {
        timerId = setTimeout(() => {
          func.apply(this, args);
          timerId = null;
        }, delay);
      }
    };
  }

  let scrollhandle = () => {
    console.log("throttle test");
    let maxScroll =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    let currentScroll = document.documentElement.scrollTop;

    bar.style.width = (currentScroll / maxScroll) * 100 + "%";
  };

  let eventThrottle = throttle(scrollhandle, 200);

  window.addEventListener("scroll", eventThrottle);

  // localstorage
  const nav = get("nav");
  const toggle = get(".arrowicon");

  const preStorage = localStorage.getItem("preStorage") === "true";
  navStorage(preStorage);

  toggle.addEventListener("click", () => {
    const currentActive = nav.classList.toggle("active");

    localStorage.setItem("preStorage", currentActive);
  });

  function navStorage(currentActive) {
    nav.classList.toggle("active", currentActive);
  }

  // mouse-pointer
  const divBox = document.createElement("div");
  divBox.classList.add("mouse-pointer");

  const elementImg = document.createElement("img");
  elementImg.src = "./img/pointer.svg";
  elementImg.alt = "pointer";

  divBox.appendChild(elementImg);
  document.body.appendChild(divBox);

  document.addEventListener("mousemove", (e) => {
    const pointer = document.querySelector(".mouse-pointer");

    let locationX = e.clientX;
    let locationY = e.clientY;

    pointer.style.position = "fixed";
    pointer.style.left = `calc(${locationX}px - 17.5px)`;
    pointer.style.top = `calc(${locationY}px - 17.5px)`;
  });
});
