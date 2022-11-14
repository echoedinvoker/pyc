const timer = document.querySelector(".timer");

const starter = function () {
  const formData = new FormData();
  formData.append("test", new File(["1"], "test.txt", { type: "text/plain" }));
  fetch(
    "http://192.168.1.101:5000/api?uuid=721ec3ad-2e32-4e36-861e-c6f07492711c",
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.close();
    })
    .catch((err) => {
      console.log(err);
      window.close();
    });
};

const question = function () {
  if (window.confirm(`Already rest for ${timer.textContent}, start study?`)) {
    starter();
  } else {
    setTimeout(question, 1000 * 5 * 60);
  }
};

question();

const btn = document.querySelector("button").addEventListener("click", starter);

const startMS = Date.now();

setInterval(() => {
  const timePass = Math.trunc((Date.now() - startMS) / 1000);

  const hours = Math.trunc(timePass / (60 * 60));
  const leftSeconds = timePass - hours * 60 * 60;
  const hourStr = String(hours).padStart(2, 0);
  const minuteStr = String(Math.trunc(leftSeconds / 60)).padStart(2, 0);
  const secondStr = String(leftSeconds % 60).padStart(2, 0);

  timer.textContent = `${hourStr}:${minuteStr}:${secondStr}`;
}, 1000);
