import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TiendaEntity } from './tienda.entity/tienda.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../compartido/errores/errores-de-negocio';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>,
      ) {}

      async create(tienda: TiendaEntity): Promise<TiendaEntity> {
        if (tienda.ciudad.length!=3) {
            throw new BusinessLogicException("La Ciudad de la Tienda es inválida", BusinessError.PRECONDITION_FAILED);
        }
        return await this.tiendaRepository.save(tienda);
      }
        
      async findAll(): Promise<TiendaEntity[]> {
        return await this.tiendaRepository.find({ });
      }

      async findOne(id: string): Promise<TiendaEntity> {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where:{id}});
        if (!tienda)
            throw new BusinessLogicException("La Tienda con el id dado no existe", BusinessError.NOT_FOUND);
    
        return tienda;
      }
    
  
      async update(id: string, tienda: TiendaEntity): Promise<TiendaEntity> {
        const persistedTienda: TiendaEntity = await this.tiendaRepository.findOne({where:{id}});
        if (!persistedTienda)
            throw new BusinessLogicException("La Tienda con el id dado no existe", BusinessError.NOT_FOUND);
       
        if (tienda.ciudad.length!=3) {
            throw new BusinessLogicException("La Ciudad de la Tienda es inválida", BusinessError.PRECONDITION_FAILED);
        }
        
        return await this.tiendaRepository.save({...persistedTienda, ...tienda});
      }
    
      async delete(id: string) {
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where:{id}});
        if (!tienda)
            throw new BusinessLogicException("La Tienda con el id dado no existe", BusinessError.NOT_FOUND);
    
        return await this.tiendaRepository.remove(tienda);
      }



}
