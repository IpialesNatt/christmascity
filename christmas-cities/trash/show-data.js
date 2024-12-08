// function to sohow the data in the local storage just the last
function showData() { //SEPT 8. to show data in the other html, we must call to the constant by their id
  const EMAIL = localStorage.getItem("email"); //save data of constant EMAIL in local storage HTML by id
  document.getElementById("email").innerHTML = EMAIL;

  const YEAR = localStorage.getItem("year");
  document.getElementById("year").innerHTML = YEAR;

  const CITY = localStorage.getItem("city");
  document.getElementById("city").innerHTML = CITY;

  const OPINION = localStorage.getItem("opinion");
  document.getElementById("opinion").innerHTML = OPINION;
}
//STEP 9 and last: call again the function
showData();