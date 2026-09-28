import { getConnection, sql } from "../utils/db.js"

export const getUsers = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request().query("SELECT * FROM Users")
    res.json(result.recordset)
}

export const getUser = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("SELECT * FROM Users WHERE id = @id")

    if (result.recordset.length === 0) {
        return res.status(404).json({ mensaje: "usuario no encontrado" })
    }
    res.json(result.recordset[0])
}

export const postUser = async (req, res) => {
    const { name, age, points, username, password } = req.body
    const pool = await getConnection()
    await pool.request()
        .input("name", sql.VarChar, name)
        .input("age", sql.Int, age)
        .input("points", sql.Int, points)
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, password)
        .query("INSERT INTO Users (name, age, points, username, password) VALUES (@name, @age, @points, @username, @password)")
    res.status(201).json({ mensaje: "usuario creado" })
}

export const putUser = async (req, res) => {
    const { name, age, points, username, password } = req.body
    const pool = await getConnection()
    const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .input("name", sql.VarChar, name)
        .input("age", sql.Int, age)
        .input("points", sql.Int, points)
        .input("username", sql.VarChar, username)
        .input("password", sql.VarChar, password)
        .query("UPDATE Users SET name = @name, age = @age, points = @points, username = @username, password = @password WHERE id = @id")

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ mensaje: "usuario no encontrado" })
    }
    res.json({ mensaje: "usuario actualizado" })
}

export const deleteUser = async (req, res) => {
    const pool = await getConnection()
    const result = await pool.request()
        .input("id", sql.Int, req.params.id)
        .query("DELETE FROM Users WHERE id = @id")

    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({ mensaje: "usuario no encontrado" })
    }
    res.json({ mensaje: "usuario eliminado" })
}
