import { Injectable, Put } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductoEntity } from '../producto/producto.entity/producto.entity';
import { TiendaEntity } from '../tienda/tienda.entity/tienda.entity';
import { Repository } from 'typeorm';
import { BusinessError, BusinessLogicException } from '../compartido/errores/errores-de-negocio';


@Injectable()
export class ProductoTiendaService {


    @InjectRepository(ProductoEntity)
    private readonly productoRepository: Repository<ProductoEntity>

    @InjectRepository(TiendaEntity)
    private readonly tiendaRepository: Repository<TiendaEntity>

    async asociarTiendaAProducto(productoId: string, tiendaId: string): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id: productoId}, relations: ["tiendas"]});
        if (!producto)
          throw new BusinessLogicException("El Producto con el id dado no fue encontrado", BusinessError.NOT_FOUND);
      
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendaId}})
        if (!tienda)
          throw new BusinessLogicException("La Tienda con el id dado no fue encontrada", BusinessError.NOT_FOUND);
    
        producto.tiendas = [...producto.tiendas, tienda];
        return await this.productoRepository.save(producto);
      }

    async obtenerTiendasPorProducto(productoId: string): Promise<TiendaEntity[]> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id: productoId}, relations: ["tiendas"]});
        if (!producto)
          throw new BusinessLogicException("El Producto con el id dado no fue encontrado", BusinessError.NOT_FOUND)
       
        return producto.tiendas;
    }


        
    async  obtenerTiendaPorProductoIdTiendaId (productoId: string, tiendaId: string): Promise<TiendaEntity> {

       
       const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendaId}})
        if (!tienda)
          throw new BusinessLogicException("La Tienda con el id dado no fue encontrada", BusinessError.NOT_FOUND);

        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id: productoId},relations: ["tiendas"]});
        if (!producto)
          throw new BusinessLogicException("El Producto con el id dado no fue encontrado", BusinessError.NOT_FOUND)
   
        const tiendaProducto: TiendaEntity = producto.tiendas.find(e => e.id === tienda.id);
   
        if (!tiendaProducto)
          throw new BusinessLogicException("La Tienda con el id dado no esta asociada al producto", BusinessError.PRECONDITION_FAILED)
   
        return tiendaProducto;
    }

    async agregarTiendasAProducto(productoId: string, tiendas: TiendaEntity[]): Promise<ProductoEntity> {
        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id: productoId},relations: ["tiendas"]});
        if (!producto)
          throw new BusinessLogicException("El Producto con el id dado no fue encontrado", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < tiendas.length; i++) {
          const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendas[i].id}});
          if (!tienda)
            throw new BusinessLogicException("La Tienda con el id dado no fue encontrada", BusinessError.NOT_FOUND);
        }
    
        producto.tiendas = tiendas;
        return await this.productoRepository.save(producto);
      }


      async eliminarTiendaDeProducto(productoId: string,tiendaId: string){
        const tienda: TiendaEntity = await this.tiendaRepository.findOne({where: {id: tiendaId}})
        if (!tienda)
          throw new BusinessLogicException("La Tienda con el id dado no fue encontrada", BusinessError.NOT_FOUND);

        const producto: ProductoEntity = await this.productoRepository.findOne({where: {id: productoId},relations: ["tiendas"]});
        if (!producto)
          throw new BusinessLogicException("El Producto con el id dado no fue encontrado", BusinessError.NOT_FOUND)
    
        const tiendaProducto: TiendaEntity = producto.tiendas.find(e => e.id === tienda.id);
    
        if (!tiendaProducto)
            throw new BusinessLogicException("La Tienda con el id dado no esta asociada al producto", BusinessError.PRECONDITION_FAILED)
     
 
        producto.tiendas = producto.tiendas.filter(e => e.id !== tiendaId);
        await this.productoRepository.save(producto);
    }  
 }





