import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

const connectDatabase = async (setDatabase) => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })
    Promise.resolve(db).then(db => {
        setDatabase(db);
    })
}

const fetchAllData = async (db) => {
    let result = []
    await db.all('SELECT * FROM Credentials').then((response) => {
        result = response
        // console.log(result);
    })
    return result;
}

const updateData = async (param) => {
    await param.db.run(
        'UPDATE Credentials SET domain = ?,username = ?,pass = ? WHERE ID = ?',
        param.data.domain,
        param.data.username,
        param.data.pass,
        param.data.ID
    )
}

const deleteData = async (param) => {
    await param.db.run('DELETE FROM Credentials WHERE ID = ?', param.data.ID)
}
const createTable = async (db) => {
    const result = await db.all("SELECT name FROM  sqlite_master WHERE type = 'table' AND name='Credentials'")
    Promise.resolve(result).then(async (response) => {
        if (response.length === 0) {
            await db.exec('CREATE TABLE Credentials (ID TEXT NOT NULL,domain TEXT NOT NULL,username TEXT NOT NULL,pass TEXT, PRIMARY KEY(ID))');
        } else {
            console.log(response);
        }
    })
}

const insertData = async (param) => {
    let id = Date.now().toString();
    param.db.run('INSERT INTO Credentials(ID,domain,username,pass) VALUES (?,?,?,?)', [id, param.data.domain, param.data.username, param.data.pass])
}

export { connectDatabase, fetchAllData, updateData, deleteData, createTable, insertData }
