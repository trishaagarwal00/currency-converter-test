


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = parseFloat(amount.value);
  if (isNaN(amtVal) || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value;
  const to = toCurr.value;

  const URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_KrIhreCdKIiqsfkDi6KXtC2tMGY4V9j4TNcQmZer&base_currency=${from}&currencies=${to}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();

    // Check if data exists and contains the currency rate
    if (data && data.data && data.data[to]) {
      let rate = data.data[to];
      let finalAmount = (amtVal * rate).toFixed(2);
      msg.innerText = `${amtVal} ${from} = ${finalAmount} ${to}`;
    } else {
      msg.innerText = "Exchange rate not found.";
    }
  } catch (error) {
    msg.innerText = "Error fetching exchange rate.";
    console.error(error);
  }
};


const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
