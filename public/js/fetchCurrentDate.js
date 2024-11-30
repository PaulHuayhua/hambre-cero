const MAIN_PATH = "http://54.163.138.15:3001/api/";          //Cambiar la direcion ip

const date = new Date();
let currentDate =
    date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
let currentDateFormatted =
    ("0" + date.getDate()).slice(-2) + "/" + ("0" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear();

fetch(MAIN_PATH + "dates/" + currentDate)
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        console.log("Mostrando data: ", data);

        if (data && data.nameCalendar) {
            document.getElementById("showDate").innerHTML = `<p>Hoy es ${currentDateFormatted} - ${data.nameCalendar}</p>`;
        } else {
            document.getElementById("showDate").innerHTML = `<p>Hoy es ${currentDateFormatted}</p>`;
        }
    })
    .catch((err) => {
        console.error("Error al obtener los datos: ", err);
        document.getElementById("showDate").innerHTML = `<p>Hoy es ${currentDateFormatted}, pero no se encontraron eventos.</p>`;
    });

