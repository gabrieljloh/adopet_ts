import express from 'express';
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    
    async criaAdotante(req: express.Request, res: express.Response) {
    try {
        const { nome, celular, endereco, foto, senha } = req.body as AdotanteEntity;

        const novoAdotante = new AdotanteEntity(
        nome,
        senha,
        celular,
        foto,
        endereco
        );

        await this.repository.criaAdotante(novoAdotante);
        return res.status(201).json(novoAdotante);
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao criar o adotante' });
    }
    }

}