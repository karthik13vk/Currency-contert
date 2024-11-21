let select = document.querySelectorAll('.currency'); // Get both select elements
let btn = document.getElementById('btn'); // Get the convert button
let reset_btn = document.getElementById('reset_btn'); // Get the reset button
let input = document.getElementById('input'); // Get the input field for the amount
let result = document.getElementById('result'); // Get the result field

// Use the Currency Beacon API for supported currencies
const apiKey = '1SMxQumaAcC996SUXGsnlBPW44t2RR82'; // Your API key from Currency Beacon

// Fetch available currencies from Currency Beacon API
fetch('https://api.currencybeacon.com/v1/currencies?api_key=' + apiKey)
  .then(res => res.json())
  .then(res => displayDropDown(res))
  .catch(err => console.error('Error fetching currencies:', err));

function displayDropDown(res) {
  // Populate the dropdown with available currencies
  let currencies = res.response; // Adjusted to match the response structure
  for (let i = 0; i < currencies.length; i++) {
    let opt = `<option value="${currencies[i].short_code}">${currencies[i].name} (${currencies[i].short_code})</option>`;
    select[0].innerHTML += opt;
    select[1].innerHTML += opt;
  }
}

// Event listener for the "Convert" button
btn.addEventListener('click', () => {
  let curr1 = select[0].value;
  let curr2 = select[1].value;
  let inputVal = input.value;

  if (curr1 === curr2) {
    alert("Choose different currencies");
  } else if (inputVal !== '' && inputVal !== '0') {
    convert(curr1, curr2, inputVal);
  } else {
    alert("Currency amount cannot be empty or zero");
  }
});

// Conversion function using Currency Beacon API
function convert(curr1, curr2, inputVal) {
  fetch(`https://api.currencybeacon.com/v1/convert?api_key=${apiKey}&from=${curr1}&to=${curr2}&amount=${inputVal}`)
    .then(resp => resp.json())
    .then((data) => {
      if (data.value) {
        result.value = data.value.toFixed(2); // Show the converted value
      } else {
        alert('Error with conversion. Please check your input.');
      }
    })
    .catch(err => {
      console.error('Error:', err);
      alert('An error occurred. Please try again later.');
    });
}

// Event listener for the "Reset" button
reset_btn.addEventListener('click', () => {
  console.log('Reset button clicked');  // Debugging line to check if the listener is working
  
  // Reset the input fields
  input.value = '';
  result.value = '';

  // Reset the dropdowns to the first option (empty or default)
  select.forEach(selectElement => {
    selectElement.selectedIndex = 0; // This resets the dropdown to the first option
  });
});
