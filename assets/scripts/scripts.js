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

  const email = document.querySelector(".modal__email");
  const password = document.querySelector(".modal__password");
  const number = document.querySelector(".modal__number");
  const problems = [];
  function vaidate() {
    const EMAIL_REGEXP =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

    const NUMBER_REGEXP =
      /^(8|\+7)?[\s\-]?\(?[4-9]\d{2}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    if (!EMAIL_REGEXP.test(email.value)) problems.push("email");

    if (!NUMBER_REGEXP.test(number.value)) problems.push("number");

    if (password.value.length < 6) problems.push("password");
  }

  btn.addEventListener("click", () => {
    vaidate();
    if (problems.length === 0) {
      btn.classList.add("sending");
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((response) => response.json())
        .then((json) => {
          alert("Заявка отправлена");
          btn.classList.remove("sending");
          messageWindow.classList.remove("active");

          console.log(json);
        });
    } else {
      alert(`Ошибки в полях - ${problems.join(" , ")}`);
    }
    problems.length = 0;
  });
}

function smoothScroll(target) {
  document.querySelector(target).scrollIntoView({
    behavior: 'smooth',
  });
}

// ������� ��� �������� ��������� ��������� ��� ��������� 
function appearOnScroll() {
  const elements = document.querySelectorAll('.hidden');

  elements.forEach((element) => {
    // ��������, ����� �� ������� � ������� ������� ���� 
    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const isVisible = rect.top <= windowHeight - 100;

    if (isVisible) {
      // ���� ������� �����, ��������� ����� 'fade-in' 
      element.classList.add('fade-in');
    }
  });
}

// ������� ��������� ��� ������ 
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll(this.getAttribute('href'));
  });
});

// ��������� ������� ��� ��������� 
window.addEventListener('scroll', appearOnScroll);

// ����� �������� ��������� ��������� ��� �������� �������� 
appearOnScroll();

toggleWindow();

sliderHandler();

sendData();
