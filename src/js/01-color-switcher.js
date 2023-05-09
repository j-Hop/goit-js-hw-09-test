function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }

  let color = null;

  const refs = {
    btnStart: document.querySelector("button[data-start]"),
    btnStop: document.querySelector("button[data-stop]"),
    body: document.querySelector("body"),
  };

  refs.btnStop.disabled = true;
  refs.btnStart.addEventListener("click", onStartColor);
  refs.btnStop.addEventListener("click", onStopColor);

  function onStartColor(){
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

    color = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor()
    }, 1000);
  }

  function onStopColor() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;

    clearInterval(color);
  }