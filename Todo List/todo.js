document.addEventListener("DOMContentLoaded", () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  const inputTxt = get("#inputtext");
  const addClick = get("#addBtn");
  const container = get(".container");

  // list 추가
  const todoAdd = () => {
    const pulltxt = inputTxt.value;
    if (pulltxt !== "") {
      listfunc(pulltxt);
      inputTxt.value = "";
      saveData(); // 데이터 저장
    } else {
      alert("글을 작성해주세요");
    }
  };

  inputTxt.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      todoAdd();
    }
  });

  addClick.addEventListener("click", todoAdd);

  // list item 생성 함수
  const listfunc = (pulltxt) => {
    let itemBox = document.createElement("div");
    itemBox.classList.add("item");
    itemBox.innerHTML = `
            <input type="text" id="listitem" value="${pulltxt}" readOnly/>
              <button type="button" id="editBtn">
                <i class="bi bi-pencil-square"></i>
              </button>
              <button type="button" id="deleteBtn">
                <i class="bi bi-x-lg"></i>
              </button>


            `;
    container.appendChild(itemBox);

    // listfunc : 수정 삭제 완료
    container.addEventListener("click", (e) => {
      const target = e.target;
      const itemBox = target.closest(".item");

      if (!itemBox) return;

      const display = itemBox.querySelector("#listitem");
      const editButton = itemBox.querySelector("#editBtn");
      const deleteButton = itemBox.querySelector("#deleteBtn");
      const confirmButton = itemBox.querySelector("#confirmBtn");

      // 삭제
      if (deleteButton && target.closest("#deleteBtn")) {
        itemBox.remove();
        saveData(); // 데이터 저장
      }
      // 수정
      if (editButton && target.closest("#editBtn")) {
        display.removeAttribute("readOnly");
        display.focus();
        // display.setSelectionRange(0, 0);

        editButton.innerHTML = `<i class="bi bi-check-lg"></i>`;
        editButton.id = "confirmBtn";
      }
      // 완료
      if (confirmButton && target.closest("#confirmBtn")) {
        display.setAttribute("readonly", "readonly");
        confirmButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
        confirmButton.id = "editBtn";
        saveData(); // 데이터 저장
      }
    });
  };
  // 저장된 데이터를 불러와서 화면에 표시
  function loadSavedData() {
    // todolist라는 키에 저장된 데이터를 가져와서 변수에 할당
    // localStorage.getItem은 해당 키에 대한 값을 가져오고, JSON.parse는 가져온 데이터를 JSON 형식으로 파싱
    const savedData = JSON.parse(localStorage.getItem("todolist"));
    // 만약 가져온 데이터가 존재한다면 실행
    if (savedData) {
      savedData.forEach((item) => {
        listfunc(item);
      });
    }
  }
  loadSavedData();

  // 새로운 데이터가 추가되거나 기존 데이터가 수정 또는 삭제될 때마다 해당 데이터를 localStorage에 저장하여 새로고침 시에도 유지
  function saveData() {
    const todoItems = document.querySelectorAll("#listitem");
    const todoList = [];
    todoItems.forEach((item) => {
      // todoList 배열에 각 요소의 value 속성 값을 추가
      todoList.push(item.value);
    });
    // localStorage에 "todolist"라는 키로 todoList 배열을 JSON 문자열로 변환하여 저장
    localStorage.setItem("todolist", JSON.stringify(todoList));
  }
});
