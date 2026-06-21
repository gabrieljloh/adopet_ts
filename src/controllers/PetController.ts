import express from 'express';
import EnumEspecie from '../enum/EnumEspecie';
import PetRepository from '../repositories/PetRepository';
import PetEntity from '../entities/PetEntity';
import EnumPorte from '../enum/EnumPorte';

export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(req: express.Request, res: express.Response) {
        const { nome, especie, dataDeNascimento, adotado, porte } = req.body as PetEntity;
        if (!(especie in EnumEspecie)) {
            return res.status(400).json({ mensagem: "Especie inválida" });
        }
        if (porte && !(porte in EnumPorte)) {
            return res.status(400).json({ mensagem: "Porte inválido" });
        }
        const novoPet = new PetEntity(nome, especie, dataDeNascimento, adotado, porte);
        
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

    async adotaPet(req: express.Request, res: express.Response) {
        const {pet_id, adotante_id} = req.params;

        const {success, message} = await this.repository.adotaPet(
            Number(pet_id),
            Number(adotante_id)
        );

        if(!success){
            return res.status(404).json({message});
        }
        return res.sendStatus(204);
    }

    async buscaPetPorCampoGenerico(req: express.Request, res: express.Response) {
        const {campo, valor} = req.query;
        const listaDePets = await this.repository.buscaPetPorCampoGenerico(
            campo as keyof PetEntity,
            valor as string
        );
        return res.status(200).json(listaDePets);
    }
}
