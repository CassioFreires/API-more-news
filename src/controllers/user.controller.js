import { createService, findAllService, findByIdService, updateService } from "../services/user.service.js";
import mongoose from "mongoose";

const create = async (req, res) => {
    try {
        const { name, username, email, password, avatar, background } = req.body;

        if (!name || !username || !username || !email || !password || !avatar || !background) {
            return res.status(400).send({ message: 'Submit all fields for registration' })
        }


        const user = await createService(req.body);

        if (!user) {
            return res.status(400).send({ message: 'Error creating User' });
        }

        res.status(201).send({
            message: 'User created successfully',
            user: {
                id: user._id,
                name,
                username,
                email,
                avatar,
                background
            }
        })
    } catch (error) {
        return res.status(500).send(error.message);
    }

}

const findAll = async (req, res) => {
    try {
        const user = await findAllService();

        if (user.length <= 0) {
            return res.status(400).send({ message: 'Not found User' });
        }

        if (!user) {
            return res.status(400).send({ message: 'Not found User' });
        }

        res.send(user)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

const findById = async (req, res) => {
    try {

        const id = req.id;
        const user = req.user;

        return res.send({
            message: 'User found successfully',
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                background: user.background
            }
        })

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

const update = async (req, res) => {
    try {
        // quero atualizar um local especifico
        const { name, username, email, avatar, background } = req.body;
        const tamanho = Object.keys(req.body).length;
        const id = req.id;

        if (!name && !username && !email && !avatar && !background) {
            return res.status(400).send({ message: "Submit at least one field for update" })
        }

        if (tamanho > 1) {
            return res.status(400).send({ message: 'Only one item can be updated at a time ' })
        }

        // acessar o banco de dados buscar o usuário e alterar os campos
        const userUpdate = await updateService(id, { name, username, email, avatar, background });

        res.send('User update successfully')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export {
    create,
    findAll,
    findById,
    update
}