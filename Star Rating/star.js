document.addEventListener("DOMContentLoaded", () => {
  const gets = (target) => {
    return document.querySelectorAll(target);
  };

  const container = gets(".star-rating");
  const currentRating = gets(".current-rating > span");

  // container : DOM 요소들의 리스트나 배열(전체 컬렉션)
  // $contain : container 안에 있는 각각의 개별 요소(그 컬렉션 내의 각 개별 요소)
  // i : 각 개별 요소에 해당하는 index
  container.forEach(($contain, i) => {
    starRating($contain);

    $contain.addEventListener("rating-refresh", (e) => {
      const rating = e.detail;
      currentRating[i].textContent = rating;
    });
  });

  function starRating(container) {
    // data-max-count 속성이 없는 경우를 대비하여 || 연산자를 사용함
    // container.dataset.maxCount가 존재하지 않거나 값이 falsy한 경우에 대비하여 기본값으로 5를 사용하도록 설정
    const maxCount = container.dataset.maxCount || 5;

    const link = document.querySelector(
      'link[rel="stylesheet"][href*="/Star Rating/star.css"]'
    );

    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = "/Star Rating/theme.css";

    link.parentNode.insertBefore(styleLink, link.nextSibling);

    container.style.setProperty("--main-color", "#dddccc");
    container.style.setProperty("--hover-color", "#adadad");
    container.style.setProperty("--select-color", "#ee470a");

    for (let i = 0; i < maxCount; i++) {
      const star = document.createElement("i");
      star.classList.add("bx", "bxs-star");
      star.style.fontSize = "55px";
      star.style.color = "var(--main-color)";

      container.appendChild(star);
    }

    let currentRatings = 0;
    const stars = container.querySelectorAll(".bx.bxs-star");

    // star : 별 요소에 대해 이벤트리스너 추가 및 이벤트 핸들러 함수가 호출될때 사용
    // index : 별 요소의 인덱스를 사용하여 현재 별 요소와 그 이전 별 요소를 식별
    stars.forEach((star, index) => {
      // handleMouseOver(stars, index)에서 매개변수를 star로 전달한다면 한개의 별 요소만 조작할 수 있기 때문에 stars로 전달
      star.addEventListener("mouseenter", () => handleMouseOver(stars, index));
      star.addEventListener("mouseleave", handleMouseLeave);
      star.addEventListener("click", () => handleMouseClick(stars, index));
    });

    function handleMouseOver(stars, currentIndex) {
      for (let i = 0; i < stars.length; i++) {
        if (i < currentRatings) {
          stars[i].style.color = "var(--select-color)";
        } else if (i <= currentIndex) {
          stars[i].style.color = "var(--hover-color)";
        }
      }
    }

    function handleMouseLeave() {
      for (let i = 0; i < stars.length; i++) {
        if (i >= currentRatings) {
          stars[i].style.color = "var(--main-color)";
        }
      }
    }

    function handleMouseClick(stars, currentIndex) {
      for (let i = 0; i < stars.length; i++) {
        if (i <= currentIndex) {
          stars[i].style.color = "var(--select-color)";
        } else {
          stars[i].style.color = "var(--main-color)";
        }
      }

      const inputRating = currentIndex + 1;
      
      // 현재 클릭한 별점과 현재 저장되어있는 별점
      // 서로 다를 경우 클릭한 별점을 현재 저장된 별점으로 업데이트
      if (inputRating !== currentRatings) {
        currentRatings = inputRating;
        const ratingEvent = new CustomEvent("rating-refresh", {
          detail: inputRating,
        });

        // 컨테이너 요소와 연결된 모든 이벤트 리스너에 전달
        container.dispatchEvent(ratingEvent);
      }
    }
  }
});
