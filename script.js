

let place_key = "dzBCd2FHQWNXVExCTDFuZmpVeVVHUVIyVEx4cXBobGlHNTdydHJjdg==";

let weather_key = "ad2e19e05a2cf55f01d62c1e889e1d5e"

$.ajax({
    url: `https://api.countrystatecity.in/v1/countries`,
    method: 'get',
    headers: {
        "X-CSCAPI-KEY": place_key
    },
    success: function (countries) {
        // console.log(countries)
        var Select = `<option value="">Select Country</option>`;
        countries.map((country, index) => {
            Select += `<option value="${country.iso2}">${country.name}</option>`;

        });
        document.getElementById('country').innerHTML = Select;
    },
});

function Country() {
    var country = document.getElementById('country').value;
    console.log(country)
    $.ajax({
        url: `https://api.countrystatecity.in/v1/countries/${country}/states`,
        method: 'get',
        headers: {
            "X-CSCAPI-KEY": place_key
        },
        success: function (states) {
            // console.log(states)
            var  Select = `<option value="">Select</option>`;
            states.map((state, index) => {
                Select += `<option value="${state.iso2}">${state.name}</option>`;

            });
            document.getElementById('state').innerHTML =  Select;
        },
    });

}


function State() {
    var country = document.getElementById('country').value;
    var state = document.getElementById('state').value;
    $.ajax({
        url: `https://api.countrystatecity.in/v1/countries/${country}/states/${state}/cities`,
        method: 'get',
        headers: {
            "X-CSCAPI-KEY": place_key
        },
        success: function (cites) {
            var  Select = `<option value="">Select</option>`;
            cites.map((city, index) => {
                Select += `<option value="${city.name}">${city.name}</option>`;

            });
            document.getElementById('citie').innerHTML =  Select;
        },
    });

}






function City() {
    var city = document.getElementById('citie').value;
    $.ajax({
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${weather_key}`,
        method: "GET",
        type: 'json',
        async: false,
        success: function (res) {
            console.log(res)
           
                   var latitude = res[0].lat
                   var longititude = res[0].lon
                   Weathershow(latitude,longititude);
        }
    })


}


function Weathershow(latitude,longititude){
    console.log(latitude,longititude)

    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longititude}&lang=hi&appid=${ weather_key}&units=metric`,
        method: "GET",
        type: 'json',
        async: false,
        success: function (res) {
            console.log(res)
            document.getElementById('temp').innerHTML=res.main.temp + `°C`;
            document.getElementById('humidity').innerHTML=res.main.humidity + `%`;
            document.getElementById('wind').innerHTML=res.main.pressure + ` km/h`;
            document.getElementById('states').innerHTML=res.name ;
            document.getElementById('min').innerHTML=res.main.temp_min ;
            document.getElementById('max').innerHTML=res.main.temp_max;
          
        }
    })
}
