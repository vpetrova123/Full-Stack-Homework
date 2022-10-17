/** Exercise 04 - API **/
$(document).ready(() => {
  const url = "https://restcountries.com/v3.1/all";

  // Add your code here
  const addCountryToDOM = (country) => {
    $("#results").append(
      $("<li>").text(
        `${country.name.common} - ${parseInt(country.population).toLocaleString(
          "en-US"
        )}`
      )
    );
  };

  const getData = (url) => {
    $.ajax({
      type: "GET",
      url: url,
      success: (data) => {
        data.forEach((country) => {
          addCountryToDOM(country);
        });
      },
      error: (error) => {
        console.log(error);
        $("#results")
          .append("<div>")
          .text(`An error occured. Please try again.`);
      },
    });
  };

  getData(url);
});
