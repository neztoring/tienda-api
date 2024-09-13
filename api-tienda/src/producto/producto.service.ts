import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductoEntity } from './producto.entity/producto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../compartido/errores/errores-de-negocio';

@Injectable()
export class ProductoService {
        constructor(
        @InjectRepository(ProductoEntity)
        private readonly productoRepository: Repository<ProductoEntity>,
      ) {}
    
      async findAll(): Promise<ProductoEntity[]> {
        return await this.productoRepository.find({ relations: ['tiendas'] });
      }

      async findOne(id: string): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{id}, relations: ['tiendas']});
        if (!producto)
            throw new BusinessLogicException("El producto con el id dado no existe", BusinessError.NOT_FOUND);
    
        return producto;
      }
    
      async create(producto: ProductoEntity): Promise<ProductoEntity> {
        return await this.productoRepository.save(producto);
      }
    
      async update(id: string, producto: ProductoEntity): Promise<ProductoEntity> {
        const persistedProducto: ProductoEntity = await this.productoRepository.findOne({where:{id}});
        if (!persistedProducto)
            throw new BusinessLogicException("El producto con el id dado no existe", BusinessError.NOT_FOUND);
            
        return await this.productoRepository.save({...persistedProducto, ...producto});
      }
    
      async delete(id: string) {
        const producto: ProductoEntity = await this.productoRepository.findOne({where:{id}});
        if (!producto)
            throw new BusinessLogicException("El producto con el id dado no existe", BusinessError.NOT_FOUND);
    
        await this.productoRepository.remove(producto);
      }


}
