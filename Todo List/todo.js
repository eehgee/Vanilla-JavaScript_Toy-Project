document.addEventListener("DOMContentLoaded", () => {
  const get = (target) => {
    return document.querySelector(target);
  };

  const inputTxt = get("#inputtext");
  const addClick = get("#addBtn");
  const container = get(".container");

  // list 추가
  addClick.addEventListener("click", () => {
    const pulltxt = inputTxt.value;
    if (pulltxt !== "") {
      listfunc(pulltxt);
      inputTxt.value = "";
    } else {
      alert("글을 작성해주세요");
    }
  });

  // listfunc : 수정 삭제 완료
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

    container.addEventListener("click", (e) => {
      const target = e.target;
      const itemBox = target.closest(".item");

      if (!itemBox) return;

      const display = itemBox.querySelector("#listitem");
      const editButton = itemBox.querySelector("#editBtn");
      const deleteButton = itemBox.querySelector("#deleteBtn");
      const confirmButton = itemBox.querySelector("#confirmBtn");

      if (deleteButton && target.closest("#deleteBtn")) {
        itemBox.remove();
      }

      if (editButton && target.closest("#editBtn")) {
        display.removeAttribute("readOnly");
        display.focus();
        display.setSelectionRange(0, 0);

        editButton.innerHTML = `<i class="bi bi-check-lg"></i>`;
        editButton.id = "confirmBtn";
      }

      if (confirmButton && target.closest("#confirmBtn")) {
        display.setAttribute("readonly", "readonly");
        confirmButton.innerHTML = `<i class="bi bi-pencil-square"></i>`;
        confirmButton.id = "editBtn";
      }
    });
  };
});
