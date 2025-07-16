const express = require('express');
const pool = require('./db');
const initdb = express.Router();
const format = require('pg-format');

initdb.get('/', async (req, res) => {
  
  const query = `
    DROP TABLE IF EXISTS buecher;
    CREATE TABLE buecher (
      id SERIAL PRIMARY KEY,
      titel VARCHAR(100),
      autor VARCHAR(100)
      
    );
  `;

  try {
    await pool.query(query);
    console.log("Tabelle 'buecher' erfolgreich erstellt.");
  } catch (err) {
    console.error("Fehler beim Erstellen der Tabelle:", err);
  }

  
  const values = [
    ['Der Steppenwolf', 'Hermann Hesse'],
    ['Effi Briest', 'Theodor Fontane'],
    ['Der Vorleser', 'Bernhard Schlink']
  ];

  
  const insertQuery = format(
    'INSERT INTO buecher (titel, autor) VALUES %L RETURNING *',
    values
  );

  try {
    const result = await pool.query(insertQuery);
    console.log("Beispielbücher erfolgreich eingefügt.");
    res.status(200).send(result.rows);
  } catch (err) {
    console.error("Fehler beim Einfügen der Bücher:", err);
    res.status(500).send('Fehler beim Einfügen');
  }
});

module.exports = initdb;
