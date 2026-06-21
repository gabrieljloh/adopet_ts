import express from 'express';
import AdotanteRepository from "../repositories/AdotanteRepository";
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from '../entities/Endereco';

export default class AdotanteController {
    constructor(private repository: AdotanteRepository) {}

    
    async criaAdotante(req: express.Request, res: express.Response) {
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
        }

    async atualizaAdotante(req: express.Request, res: express.Response) {
        const {id} = req.params;
        const {success, message} = await this.repository.atualizaAdotante(
            Number(id),
            req.body as AdotanteEntity
        );

        if(!success) {
            return res.status(404).json({message});
        }

        return res.sendStatus(204);
    }

    async listaAdotantes(req: express.Request, res: express.Response) {
        const listaDeAdotantes = await this.repository.listaAdotantes();
        return res.json(listaDeAdotantes);
    }

    async deletaAdotante(req: express.Request, res: express.Response) {
        const {id} = req.params;
        const {success, message} = await this.repository.deletaAdotante(Number(id));
        
        if(!success){
            return res.status(404).json({message});
        }
        return res.sendStatus(204);
    }

    async atualizaEnderecoAdotante(req: express.Request, res: express.Response) {
        const {id} = req.params;
        const {success, message} = await this.repository.atualizaEnderecoAdotante(
            Number(id),
        req.body as EnderecoEntity);
        
        if(!success){
            return res.status(404).json({message});
        }
        return res.sendStatus(204);
    }

}