//Get list tag
const countriesList = document.getElementById('countries');
let countries; //Will contain fetched data object

//Event listener  on change selection 
countriesList.addEventListener('change', newCountrySelection);

//To passing to eventListener
function newCountrySelection(event) {
  //Invoke function sending the value of selection
  displayCountryInfo(event.target.value);
}

//Fetching data from rest api
fetch('https://restcountries.eu/rest/v2/all')
  //Getting response and converting data in json
  .then(response => response.json())
  //Getting json and send it to intialize function to charge a value
  .then(data => initialize(data))
  //Catching the error if there is one
  .catch(err => console.log(err));

//Initialize the select and fieds with a random value
function initialize(countriesData) {
  //saving fetching data on countries variable initialized at start
  countries = countriesData;
  //Variable to create the template to inject on select tag
  let options = '';

  //Mapping the array and painting the option tag on select 
  countries.forEach(country => {
    //concating teplate with fetching data. the value and text of option
    options += `<option value="${country.alpha3Code}">${country.name}</option>`;
  });
  //Adding the options tags on select tag
  countriesList.innerHTML = options;

  //Generating a random country
  countriesList.selectedIndex = Math.floor(Math.random() * countriesList.length);
  //sending the value to function for diplay data on fields p and img
  displayCountryInfo(countriesList[countriesList.selectedIndex].value);
}

//Function that recive the selected value (CODE).
function displayCountryInfo(countryByAlpha3Code) {
  //Subtract the information of country on mapping the countries array saved in initialize function
  const countryData = countries.find(country => country.alpha3Code === countryByAlpha3Code);
  //Display country information on tags
  document.querySelector('#flag-container img').src = countryData.flag;
  document.querySelector('#flag-container img').alt = `Flag of ${countryData.name}`;
  document.getElementById('capital').innerHTML = countryData.capital;
  document.getElementById('dialing-code').innerHTML = `+${countryData.callingCodes[0]}`;
  document.getElementById('population').innerHTML = countryData.population.toLocaleString();
  document.getElementById('currency').innerHTML = countryData.currencies.filter(c => c.name !== null).map(c => `${c.name} (${c.code})`).join(', ');
  document.getElementById('region').innerHTML = countryData.region;
  document.getElementById('subregion').innerHTML = countryData.subregion;
}