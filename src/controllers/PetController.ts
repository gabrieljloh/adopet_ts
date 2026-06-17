import express from 'express';
import EnumEspecie from '../enum/EnumEspecie';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';

export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(req: express.Request, res: express.Response) {
        const { nome, especie, dataDeNascimento, adotado } = req.body as PetEntity;
        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ mensagem: "Especie inválida" });
        }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado);
        
        await this.repository.criaPet(novoPet);
        return res.status(201).json(novoPet);
    }

    async listaPets(req: express.Request, res: express.Response) {
        const pets = await this.repository.listaPets();
        return res.status(200).json(pets);
    }

    async atualizaPet(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(
            Number(id),
             req.body as PetEntity
        );
        if (!success) {
            return res.status(404).json({ message });
        }
        return res.status(204).json({ mensagem: "Pet atualizado com sucesso" });
    }

    async deletaPet(req: express.Request, res: express.Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.deletaPet(Number(id));
        if (!success) {
            return res.status(404).json({ message });
        }
        return res.status(204).json({ mensagem: "Pet deletado com sucesso" });
    }
}
