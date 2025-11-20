const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const card = document.getElementById("card");
const message = document.getElementById("message");

const SAFE_MARGIN = 15; // Минимальный отступ от краёв
const RUN_DISTANCE = 120; // Дистанция срабатывания убегания

function getRandomPos(xCursor, yCursor) {
  const rect = card.getBoundingClientRect();
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  let x, y;

  // выбираем новую позицию до тех пор, пока она достаточно далека
  do {
    x = Math.random() * (rect.width - btnW - SAFE_MARGIN * 2) + SAFE_MARGIN;
    y = Math.random() * (rect.height - btnH - SAFE_MARGIN * 2) + SAFE_MARGIN;
  } while (Math.hypot(x - xCursor, y - yCursor) < RUN_DISTANCE);

  return { x, y };
}

// Двигаем кнопку по всей карточке
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const cursorX = e.clientX - rect.left;
  const cursorY = e.clientY - rect.top;

  const btnRect = noBtn.getBoundingClientRect();
  const btnCenterX = btnRect.left - rect.left + btnRect.width / 2;
  const btnCenterY = btnRect.top - rect.top + btnRect.height / 2;

  const distance = Math.hypot(cursorX - btnCenterX, cursorY - btnCenterY);

  if (distance < RUN_DISTANCE) {
    const pos = getRandomPos(cursorX, cursorY);
    noBtn.style.left = pos.x + "px";
    noBtn.style.top = pos.y + "px";
  }
});

yesBtn.addEventListener("click", () => {
  message.style.display = "block";
});
