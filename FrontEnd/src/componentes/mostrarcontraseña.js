document.addEventListener("keyup", () => {
  const input1 = document.getElementById('Input1');
  const icon = document.querySelector('.bx');

  if (input1 && icon) {
    icon.addEventListener("click", () => {
      if (input1.type === "password") {
        input1.type = "text";
        icon.classList.remove('bx-show');
        icon.classList.add('bx-hide');
      } else {
        input1.type = "password";
        icon.classList.remove('bx-hide');
        icon.classList.add('bx-show');
      }
    });
  }
});



