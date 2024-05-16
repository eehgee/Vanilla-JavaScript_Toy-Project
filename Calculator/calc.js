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
  const total = get(".total");

  const number = gets(".number");
  const operation = gets(".operation");

  // reset 이벤트
  reset.addEventListener("click", () => {
    textInput.value = "0";
  });

  // backspace 이벤트
  backSpace.addEventListener('click', ()=>{
     let inputText = textInput.value;
     if(inputText.length > 0){
        inputText = inputText.slice(0, -1)
     }
     textInput.value = inputText
  })

  // '.' 이벤트
  dot.addEventListener("click", (e) => {
    if (!textInput.value.includes(".")) {
      textInput.value += ".";
    }
  });

  // 숫자 입력 이벤트
  number.forEach((num) => {
    num.addEventListener("click", (e) => {
      const numberBtn = e.target.textContent;
      if (textInput.value === "0") {
        textInput.value = numberBtn;
      } else {
        textInput.value += numberBtn;
      }
    });
  });

  // 사칙연산 입력 이벤트
  operation.forEach((oper) => {
    oper.addEventListener("click", (e) => {
      operBtn = e.target.textContent;

      // 현재 입력된 숫자를 첫번째 피연산자로 설정
      firstNumber = parseFloat(textInput.value);
      textInput.value = "";
    });
  });

  // 결과 이벤트
  total.addEventListener("click", () => {
    // 현재 입력된 숫자를 가져옴
    secondNumber = parseFloat(textInput.value);
    result = "";
    switch (operBtn) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "*":
        result = firstNumber * secondNumber;
        break;
      case "÷":
        if (secondNumber !== 0) {
          result = firstNumber / secondNumber;
        } else {
          result = "error";
        }
        break;

      default:
        break;
    }
    textInput.value = result;
  });
});
