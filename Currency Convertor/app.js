const API_KEY = "fca_live_rKh1uQgw7EvSauNxKTPTvdweEvTRDzj7Zwk1SMla";
const BASE_URL = "https://api.currencyapi.com/v3/latest";

const dropdowns = document.querySelectorAll(".dropdown select"); 
const convertBtn = document.getElementById("button");

const amount = document.getElementById("amount");
const msg = document.querySelector(".msg");

    // Populate the dropdowns with the currency options
    for (let select of dropdowns) {
      for (let currency in countryList) {
        let newOption = document.createElement("option");
        newOption.value = currency;
        newOption.textContent = currency.toUpperCase();

        // Appending the options to the select element
        select.append(newOption);

        // Setting default values (USD and INR)
        if (select.name === "from" && currency === "USD") {
          newOption.selected = true;
        } else if (select.name === "to" && currency === "INR") {
          newOption.selected = true;
        }
      }

      // Calls updateFlag function
      select.addEventListener("change", function(evt) {
        updateFlag(evt.target);
      });
    }
// Function to update the flag
function updateFlag(element) {
  let currency = element.value;
  console.log(currency);
  let countryCode = currency.slice(0, 2).toUpperCase(); // Assuming the first two letters represent the country code
  let flag = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = flag;
}

// Event Listener for the convert button
convertBtn.addEventListener("click", function(event) {
  event.preventDefault();
  convertCurrency();
});

// Function to convert the currency
async function convertCurrency() {
  let amountVal = amount.value;

  if (amountVal === "" || amountVal < 1) {
    amount.value = 1;
    amountVal = 1;
  }

  // Getting the currency values
  let fromCurrency = document.querySelector(".from select").value.toUpperCase();
  let toCurrency = document.querySelector(".to select").value.toUpperCase();

  const URL = `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    let data = await response.json();

    let rate = data.data[toCurrency].value;
    let exchangeAmount = amountVal * rate;

    msg.textContent = `${amountVal} ${fromCurrency} = ${exchangeAmount.toFixed(2)} ${toCurrency}`;
  } catch (error) {
    console.error("Error converting currency:", error);
    msg.textContent = "Error retrieving exchange rate.";
  }
}

convertCurrency();

// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    if (body.classList.contains("dark-mode")) {
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    } else {
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
    }
});
