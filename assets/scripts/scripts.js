function sliderHandler() {
  const slidesContainer = document.querySelector(".com__overflow");
  const buttonsNextArray = document.querySelectorAll(".next");
  const buttonsPrevArray = document.querySelectorAll(".prev");
  const lineItems = document.querySelectorAll(".com__slider-item");

  let counter = 0;
  function changeLineSegment(number) {
    lineItems.forEach((el) => {
      el.classList.remove("active");
    });
    lineItems[number].classList.add("active");
  }
  console.log(buttonsNextArray);
  buttonsNextArray.forEach((el, index) => {
    el.addEventListener("click", () => {
      if (counter !== 2) {
        counter++;
        changeLineSegment(counter);

        slidesContainer.style.left = `-${counter}00%`;
      }
    });
  });
  buttonsPrevArray.forEach((el, index) => {
    el.addEventListener("click", () => {
      if (counter !== 0) {
        counter--;
        changeLineSegment(counter);

        slidesContainer.style.left = `-${counter}00%`;
      }
    });
  });
}

function toggleWindow() {
  const messageWindow = document.querySelector(".modal__container");
  const buttons = document.querySelectorAll(".btn-modal");
  buttons.forEach((el) => {
    el.addEventListener("click", (e) => {
      messageWindow.classList.add("active");
    });
  });
  messageWindow.addEventListener("click", (e) => {
    console.log(e.target.classList.contains("modal__container"));
    if (e.target.classList.contains("modal__container")) {
      messageWindow.classList.remove("active");
    }
  });
}

function sendData() {
  const btn = document.querySelector(".modal__btn");
  const messageWindow = document.querySelector(".modal__container");

  btn.addEventListener("click", () => {
    btn.classList.add("sending");
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        alert("Заявка отправлена");
        btn.classList.remove("sending");
        messageWindow.classList.remove("active");

        console.log(json);
      });
  });
}

toggleWindow();

sliderHandler();

sendData();
