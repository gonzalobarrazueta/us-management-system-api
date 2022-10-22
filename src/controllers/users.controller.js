import { pool } from '../db.js'

// GET ALL
export const getUsers = async (req, res) => {
    // if it works correctly, it will execute try
    try {
        const [rows] = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}

// Get User by id
export const getUser = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [req.params.id]);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'Employee not found'
            })
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}

// POST USER
export const createUser = async (req, res) => {  
    try {
        const { names, last_names, institution, phone, email, password } = req.body;

        const [rows] = await pool.query('INSERT INTO users (names, last_names, institution, phone, email, password) VALUES (?, ?, ?, ?, ?, ?)', [names, last_names, institution, phone, email, password]);

        res.send({
            id: rows.insertId,
            names,
            last_names,
            institution,
            phone,
            email,
            password         
        });
    } catch (error) {
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [req.params.id]);

        if (result.affectedRows <= 0) return res.status(404).
        json({
            message: 'User not found'
        });

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message:"Something goes wrong"
        })
    }
}

export const updateUser = async (req, res) => {
    
    const { id } = req.params;
    const { names, last_names } = req.body;

    const [result] = await pool.query('UPDATE users SET names = IFNULL(?, names), last_names = IFNULL(?, last_names) WHERE id = ?', [names, last_names, id])
    
    if (result.affectedRows === 0) return res.status(404).json({
        message: 'User not found'
    })

    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
    res.json(rows);
}