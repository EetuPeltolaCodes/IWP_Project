async function fetchData() {
  const jsonQuery = {   // Use jsonQuery to get the desired data from the JSON-file
    "query": [
      {
        "code": "Kunta",
        "selection": {
          "filter": "item",
          "values": [
            "020",
            "005",
            "009",
            "010",
            "016",
            "018",
            "019",
            "046",
            "047",
            "049",
            "050",
            "051",
            "052",
            "061",
            "069",
            "071",
            "072",
            "074",
            "075",
            "077",
            "078",
            "079",
            "081",
            "082",
            "086",
            "111",
            "090",
            "091",
            "097",
            "098",
            "099",
            "102",
            "103",
            "105",
            "106",
            "108",
            "109",
            "139",
            "140",
            "142",
            "143",
            "145",
            "146",
            "153",
            "148",
            "149",
            "151",
            "152",
            "165",
            "167",
            "169",
            "171",
            "172",
            "176",
            "177",
            "178",
            "179",
            "181",
            "182",
            "186",
            "202",
            "204",
            "205",
            "208",
            "211",
            "213",
            "214",
            "216",
            "217",
            "218",
            "224",
            "226",
            "230",
            "231",
            "232",
            "233",
            "235",
            "236",
            "239",
            "240",
            "320",
            "241",
            "322",
            "244",
            "245",
            "249",
            "250",
            "256",
            "257",
            "260",
            "261",
            "263",
            "265",
            "271",
            "272",
            "273",
            "275",
            "276",
            "280",
            "284",
            "285",
            "286",
            "287",
            "288",
            "290",
            "291",
            "297",
            "300",
            "301",
            "304",
            "305",
            "312",
            "316",
            "317",
            "398",
            "399",
            "400",
            "407",
            "402",
            "403",
            "405",
            "408",
            "410",
            "416",
            "418",
            "420",
            "421",
            "422",
            "423",
            "425",
            "426",
            "444",
            "430",
            "433",
            "434",
            "435",
            "436",
            "440",
            "441",
            "475",
            "480",
            "481",
            "483",
            "484",
            "489",
            "491",
            "494",
            "495",
            "498",
            "499",
            "500",
            "503",
            "504",
            "505",
            "508",
            "507",
            "529",
            "531",
            "535",
            "536",
            "538",
            "541",
            "543",
            "545",
            "560",
            "561",
            "562",
            "563",
            "564",
            "309",
            "576",
            "577",
            "578",
            "445",
            "580",
            "581",
            "599",
            "583",
            "854",
            "584",
            "588",
            "592",
            "593",
            "595",
            "598",
            "601",
            "604",
            "607",
            "608",
            "609",
            "611",
            "638",
            "614",
            "615",
            "616",
            "619",
            "620",
            "623",
            "624",
            "625",
            "626",
            "630",
            "631",
            "635",
            "636",
            "678",
            "710",
            "680",
            "681",
            "683",
            "684",
            "686",
            "687",
            "689",
            "691",
            "694",
            "697",
            "698",
            "700",
            "702",
            "704",
            "707",
            "729",
            "732",
            "734",
            "790",
            "738",
            "739",
            "740",
            "742",
            "743",
            "746",
            "747",
            "748",
            "791",
            "749",
            "751",
            "753",
            "755",
            "758",
            "759",
            "761",
            "762",
            "765",
            "768",
            "777",
            "778",
            "781",
            "783",
            "831",
            "832",
            "833",
            "834",
            "837",
            "844",
            "845",
            "846",
            "848",
            "849",
            "850",
            "851",
            "853",
            "857",
            "858",
            "859",
            "886",
            "887",
            "889",
            "890",
            "892",
            "893",
            "895",
            "785",
            "905",
            "908",
            "911",
            "092",
            "915",
            "918",
            "921",
            "922",
            "924",
            "925",
            "927",
            "931",
            "934",
            "935",
            "936",
            "946",
            "976",
            "977",
            "980",
            "981",
            "989",
            "992"
          ]
        }
      },
    {
      "code": "Lukumäärätiedot",
      "selection": {
        "filter": "item",
        "values": [
          "Apro",
          "Suurinpuolue",
          "Pro_01",
          "Pro_02",
          "Pro_03",
          "Pro_04",
          "Pro_05",
          "Pro_06",
          "Pro_07",
          "Pro_08",
          "Pro_99"
          ]
        }
      }
    ],
    "response": {
      "format": "json-stat2"
    }
  }

  const data_url = "https://statfin.stat.fi/PxWeb/api/v1/en/StatFin/kvaa/km_ku.px";   // Fetch the data using POST
  const res = await fetch(data_url, {
      method: "POST",
      headers: {"content-type":"fetch/json"},
      body: JSON.stringify(jsonQuery)
  });

  if (!res.ok) {  // Check if the fetching has been done right
      return;
  }

  const data = await res.json();    // Parse the JSON-data
  const municipality = Object.values(data.dimension.Kunta.category.label).sort((a, b) => a.localeCompare(b));
  const valueLabels = Object.values(data.dimension.Lukumäärätiedot.category.label);
  const values = data.value;

  const coordinates_url = "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";
  const res2 = await fetch(coordinates_url);  // Fetch the geoJSON data from a different API
  const data2 = await res2.json();

  data2.features.sort((a, b) => a.properties.nimi.localeCompare(b.properties.nimi));  // Sort the geoJSON data alphabetically

  // There is some municipalities which aren't in data but are in data2 so we have to remove them
  var noDataArray = ["Brändö","Eckerö","Finström","Föglö","Geta","Hammarland","Jomala","Kumlinge",
  "Kökar","Lemland","Lumparland","Maarianhamina - Mariehamn","Saltvik","Sottunga","Sund","Vårdö"];
  
  var map = L.map("map", { minZoom: -3 }).setView([51.505, -0.09], 13);;  // Create a map 
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  var n = 0;  // Variables to help with the first data
  var i = 0;

  var geojsonLayer = L.geoJSON(data2, {
          style: function (feature) {   // Different colors for different parties in the map
            const municipality2 = feature.properties.nimi;
            var colour = "#FFFFFF";

            if (!noDataArray.includes(municipality2)) {   // Check if there isn't geodata for the municipality 
                switch (values[n+1]) {
                  case 1:
                    colour = "#3bad2e"
                    break;
                  case 2:
                    colour = "#003859"
                    break;
                  case 3:
                    colour = "rgb(255,235,0)"
                    break;
                  case 4:
                    colour = "#f54b4b"
                    break;
                  case 5:
                    colour = "#006845"
                    break;
                  case 6:
                    colour = "#F00A64"
                    break;
                  case 7:
                    colour = "rgb(160,210,255)"
                    break;
                  case 8:
                    colour = "#F18716"
                    break;
                  case 99:
                    colour = "rgb(0,0,0)"
                }
            };
            return {
              color: colour,
              weight: 2,
              fillOpacity: 0.5,
            };
          },
          onEachFeature: function (feature, layer) {
            const municipality2 = feature.properties.nimi;
          
            if (!noDataArray.includes(municipality2)) {   // Check if there isn't geodata for the municipality
              if (municipality[i]!=municipality2) {  // Check if there isn't data for the municipality
                n=n+11;
                i=i+1;
              }
              //console.log(municipality[i] + ", " + municipality2);

              var party;  // Changing the biggest party from a number to their own name

              switch (values[n+1]) {
                case 1:
                 party = "Keskusta"
                  break;
                case 2:
                 party = "Kokoomus"
                  break;
                case 3:
                 party = "Perussuomalaiset"
                  break;
                case 4:
                 party = "Sosiaalidemokraatit"
                  break;
                case 5:
                 party = "Vihreät"
                  break;
                case 6:
                 party = "Vasemmistoliitto"
                  break;
                case 7:
                 party = "Suomen ruotsalainen kansanpuolue"
                  break;
                case 8:
                 party = "Kristillisdemokraatit"
                  break;
                case 99:
                 party = "Muut puolueet"
              };

              // Creating the popUpContent for the map
              const popUpCOntent = ` 
              Municipality: ${municipality[i]}
              <br>${valueLabels[0]}: ${values[n]}%
              <br>${valueLabels[1]}: ${party}
              <br>${valueLabels[2]}: ${values[n+2]}%
              <br>${valueLabels[3]}: ${values[n+3]}%
              <br>${valueLabels[4]}: ${values[n+4]}%
              <br>${valueLabels[5]}: ${values[n+5]}%
              <br>${valueLabels[6]}: ${values[n+6]}%
              <br>${valueLabels[7]}: ${values[n+7]}%
              <br>${valueLabels[8]}: ${values[n+8]}%
              <br>${valueLabels[9]}: ${values[n+9]}%
              <br>${valueLabels[10]}: ${values[n+10]}%
              `;
                  
              layer.bindPopup(popUpCOntent);  // Adding the popUpContent

              //console.log(popUpCOntent);
                
              n=n+11;
              i=i+1;
          }            
        },
      }).addTo(map);

    map.fitBounds(geojsonLayer.getBounds());

    // I looked help for this evenlistener from: https://www.codeinwp.com/snippets/add-event-listener-to-multiple-elements-with-javascript/

    let btns = document.querySelectorAll('button');

    btns.forEach(function (i) {
      i.addEventListener('click',function() {
        const party = 
        printData(i,municipality, values)
      });
    });

}

fetchData();  // Call the async function

function printData(party,municipality,values) { // This function adds the table when the party's button is pressed
  const head = document.createElement("tr");
  //console.log(party.textContent);

  const municipalityhead = document.createElement("th");  // Create header
  municipalityhead.textContent = "Municipality";
  head.appendChild(municipalityhead);

  const partyhead = document.createElement("th");
  partyhead.textContent = "Voting -% of " +  party.textContent;
  head.appendChild(partyhead);

  const partyStyle = getPartyColor(party.textContent);  // Call getPartyColor() to change the style of the header
  Object.assign(head.style, partyStyle);

  const table_head = document.getElementById("data_table_head");  // Append head
  table_head.innerHTML = "";
  table_head.appendChild(head);

  var n=0;

  switch (party.textContent) {  // Check which party's button is pressed
    case "Keskusta":
      n=2;
      break;

    case "Kokoomus":
      n=3;
      break;

    case "Perussuomalaiset":
      n=4;
      break;

    case "Sosiaalidemokraatit":
      n=5;
      break;

    case "Vihreät":
      n=6;
      break;

    case "Vasemmistoliitto":
      n=7;
      break;

    case "Suomen ruotsalainen kansanpuolue":
      n=8;
      break;

    case "Kristillisdemokraatit":
      n=9;
      break;

    case "Muut puolueet":
      n=10;
      break;
  }

  const table_body = document.getElementById("data_table_body");
  table_body.innerHTML = "";

  for (let i = 0; i < municipality.length; i++) {   // Create all the body elements
    const row = document.createElement("tr");

    const row_municipality = document.createElement("td");  // Get the municipality
    row_municipality.textContent = municipality[i];
    row.appendChild(row_municipality);
    
    const row_value = document.createElement("td");   // Get the voting % 
    row_value.textContent = `${values[n]}%`;
    row.appendChild(row_value);

    //console.log(row + " " + n);

    table_body.appendChild(row);  // Add a row

    if (values[n]<=5) {   // Change the background color of the row depending on the voting precent
      row.style.backgroundColor = "#ff9e9e";
    } else if (values[n]>=20) {
      row.style.backgroundColor = "#abffbd";
    } else {
      row.style.backgroundColor = "#D3D3D3"
    };

    n=n+11;
  }

};

function getPartyColor(partyName) {   // Change the style of different parties
  switch (partyName) {
    case "Keskusta":
      return {
        backgroundColor: "#3bad2e",
      };
    case "Kokoomus":
      return {
        backgroundColor: "#003859",
        color: "white",
    };
    case "Perussuomalaiset":
      return {
        backgroundColor: "rgb(255,235,0)",
    };
    case "Sosiaalidemokraatit":
      return {
        backgroundColor: "#f54b4b",
    };
    case "Vihreät":
      return {
        backgroundColor: "#006845",
    };
    case "Vasemmistoliitto":
      return {
        backgroundColor: "#F00A64",
    };
    case "Suomen ruotsalainen kansanpuolue":
      return {
        backgroundColor: "rgb(160,210,255)",
    };
    case "Kristillisdemokraatit":
      return {
        backgroundColor: "#F18716",
    };
    case "Muut puolueet":
      return {
        backgroundColor: "rgb(0,0,0)",
        color: "white",
    };
    default:
      return "#FFFFFF"; // Default color if the party name doesn't match any of the cases
  }
}
