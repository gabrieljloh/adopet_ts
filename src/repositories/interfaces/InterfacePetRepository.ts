import PetEntity from "../../entities/PetEntity";

export default interface InterfacePetRepository {
    criaPet(pet: PetEntity): Promise<void>;
    listaPets(): Array<PetEntity> | Promise<PetEntity[]>;
    atualizaPet(id: number, pet: PetEntity): Promise<{success: boolean, message?: string}> | void;
    deletaPet(id: number): Promise<{success: boolean, message?: string}> | void;
}