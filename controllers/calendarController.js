const { connectionCalendar } = require("../database/dbConnections"); 

const getDateInfo = (req, res) => {
    const request = req.params.current;
    console.log("Fecha solicitada: ", request);

    connectionCalendar.query(
        "SELECT nameCalendar, description, DATE_FORMAT(date, '%d/%m/%Y') AS date FROM calendario WHERE date = ?",
        [request],
        (err, row) => {
            if (err) {
                res.status(500).send("Error al obtener datos del calendario");
            } else {
                res.json(row.length > 0 ? row[0] : null);
            }
        }
    );
};

const getCalendarDate = (req, res) => {
    getDateInfo(req, res);
};

module.exports = { getCalendarDate };
