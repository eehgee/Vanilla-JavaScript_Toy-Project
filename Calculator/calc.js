document.addEventListener("DOMContentLoaded", () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  const gets = (target) => {
    return document.querySelectorAll(target);
  };

  const textInput = get("#textInput");
  textInput.value = "0";

  const reset = get(".reset");
  const backSpace = get(".back");
  const dot = get(".dot");
  const number = gets(".number");
  const operation = gets(".operation");
  const total = get(".total");

  // 이전, 현재, 사칙연산 저장
  let prevNumber = "0";
  let currentNumber = "0";
  let operBtn = "";

  // reset 이벤트
  reset.addEventListener("click", () => {
    textInput.value = "0";
    console.log(textInput.value);
    prevNumber = "0";
    currentNumber = "0";
    operBtn = "";
  });

  // backspace 이벤트
  backSpace.addEventListener("click", () => {
    textInput.value = textInput.value.slice(0, -1) || 0;
    currentNumber = parseFloat(textInput.value);

    if (currentNumber === 0) {
      currentNumber = "0";
      prevNumber = "0";
      operBtn = "";
    }
  });

  // '.' 이벤트
  dot.addEventListener("click", () => {
    currentNumber = textInput.value;
  const lastOperatorIndex = Math.max(
    currentNumber.lastIndexOf('+'),
    currentNumber.lastIndexOf('-'),
    currentNumber.lastIndexOf('*'),
    currentNumber.lastIndexOf('÷')
  );
  const lastNumber = currentNumber.slice(lastOperatorIndex + 1);
  if (!lastNumber.includes(".")) {
    textInput.value += ".";
  }
  });

  // 숫자 입력 이벤트
  number.forEach((num) => {
    num.addEventListener("click", (e) => {
      // 최대 10자리까지 입력가능
      if (textInput.value.length > 9) {
        textInput.value = textInput.value.slice(0, 9);
      }

      const numberBtn = e.target.textContent;
      if (textInput.value === "0") {
        textInput.value = numberBtn;
      } else {
        textInput.value += numberBtn;
      }
      currentNumber = parseFloat(textInput.value);
      console.log(textInput.value);
    });
  });

  // 연산 버튼 이벤트
  operation.forEach((oper) => {
    oper.addEventListener("click", (e) => {
      // operator : 클릭된 연산자를 나타냄
      const operator = e.target.textContent;

      // 현재 입력된 연산자와 이전에 입력된 연산자 비교
      if (operBtn !== null && operBtn !== operator) {
        // 현재 클릭된 연산자를 입력 창에 추가
        textInput.value += operator;

        if (prevNumber === "0") {
          prevNumber = parseFloat(textInput.value);
        }
      }

      operBtn = operator; // 현재 입력된 연산자 저장
      textInput.value = console.log(operBtn);
      textInput.value = prevNumber.toString() + operBtn; // 화면에 표시된 수식을 비움. 새로운 숫자나 연산자를 입력하기 위해 수식 초기화
      currentNumber = 0; // 현재 숫자를 0으로 초기화. 새로운 숫자를 입력하기 위해 현재 숫자 초기화
    });
  });

  // 등호 입력 이벤트
  total.addEventListener("click", () => {
    // 현재 입력된 숫자를 저장
    currentNumber = parseFloat(
      textInput.value.slice(prevNumber.toString().length + 1)
    );

    calculator();
    // 연산자 초기화
    operBtn = "";
  });

  function calculator() {
    // 이전 결과가 있는 경우와 없는 경우를 구분하여 처리
    if (prevNumber !== null && currentNumber !== null) {
      // 저장된 이전 숫자와 현재 숫자에 대해 연산 수행
      switch (operBtn) {
        case "+":
          prevNumber += currentNumber;
          break;
        case "-":
          prevNumber -= currentNumber;
          break;
        case "*":
          prevNumber *= currentNumber;
          break;
        case "÷":
          if (prevNumber !== 0) {
            prevNumber /= currentNumber;
          } else {
            textInput.value = "error";

            return;
          }

          break;
        default:
          break;
      }
      // 결과를 텍스트 입력창에 표시
      textInput.value += " = " + prevNumber;
      console.log(textInput.value);
    }
  }
});
