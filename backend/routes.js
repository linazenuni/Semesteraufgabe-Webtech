const express = require('express');
const router = express.Router();
const pool = require('./db');


router.get('/', async (req, res) => {
    res.send({ message: "Hello FIW!" });
});


router.post('/buecher', async (req, res) => {
    let titel = (req.body.titel) ? req.body.titel : null;
    let autor = (req.body.autor) ? req.body.autor : null;


    const query = `INSERT INTO buecher(titel, autor) VALUES ($1, $2) RETURNING *`;

    try {
        const result = await pool.query(query, [titel, autor]);
        console.log(result);
        res.send(result.rows[0]);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Fehler beim Einfügen des Buchs");
    }
});



router.delete('/buecher/:id', async (req, res) => {
    const query = `DELETE FROM buecher WHERE id = $1`;

    try {
        const id = req.params.id;
        const result = await pool.query(query, [id]);
        console.log(result);

        if (result.rowCount == 1) {
            res.send({ message: "Buch mit ID=" + id + " gelöscht" });
        } else {
            res.status(404).send({ message: "Kein Buch gefunden mit ID=" + id });
        }
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Fehler beim Löschen");
    }
});

router.get('/buecher', async (req, res) => {
    const query = `SELECT * FROM buecher ORDER BY id ASC`;

    try {
        const result = await pool.query(query);
        res.send(result.rows);
    } catch (err) {
        console.log(err.stack);
        res.status(500).send("Fehler beim Abrufen der Bücher");
    }
});


module.exports = router;
