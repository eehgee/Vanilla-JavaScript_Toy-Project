document.addEventListener('DOMContentLoaded', () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  // element 동적 생성
  const container = get('.analog-clock');

  const eleHour = document.createElement('div');
  const eleMinute = document.createElement('div');
  const eleSecond = document.createElement('div');

  eleHour.classList.add('hand', 'hour');
  eleMinute.classList.add('hand', 'minute');
  eleSecond.classList.add('hand', 'second');

  container.appendChild(eleHour);
  container.appendChild(eleMinute);
  container.appendChild(eleSecond);

  for (let i = 1; i <= 12; i++) {
    const times = document.createElement('div');
    times.classList.add('time', `time${i}`);
    times.innerHTML = '|';
    container.appendChild(times);
  }

  // 현재 시간 및 각도 구하기
  function moveclock() {
    const clock = new Date();

    const hour = clock.getHours();
    const minute = clock.getMinutes();
    const second = clock.getSeconds();

    const deghour = (hour % 12) * 30 + minute / 2; // 시간당 30도씩 회전 + 1분당 0.5도씩 회전
    const degminute = minute * 6 + second / 10; // 1분당 6도씩 회전 + 1초당 0.1도씩 회전
    const degsecond = second * 6; // 1초당 5도씩 회전

    eleHour.style.transform = `rotate(${deghour}deg)`;
    eleMinute.style.transform = `rotate(${degminute}deg)`;
    eleSecond.style.transform = `rotate(${degsecond}deg)`;
  }

  moveclock();

  setInterval(moveclock, 1000);
});
