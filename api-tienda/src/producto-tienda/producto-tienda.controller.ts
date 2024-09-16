import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { ErroresDeNegocioInterceptor } from '../compartido/interceptores/errores-de-negocio.interceptor';
import { ProductoTiendaService } from './producto-tienda.service';
import { TiendaDto } from '../tienda/tienda.dto/tienda.dto';
import { TiendaEntity } from 'src/tienda/tienda.entity/tienda.entity';
import { plainToInstance } from 'class-transformer';

@Controller('products')
@UseInterceptors(ErroresDeNegocioInterceptor)
export class ProductoTiendaController {

    constructor(private readonly productoTiendaService: ProductoTiendaService) {}

   @Post(':productoId/stores/:tiendaId')
   async agregarTiendaAProducto(@Param('productoId') productoId: string,@Param('tiendaId') tiendaId: string){
       return await this.productoTiendaService.asociarTiendaAProducto(productoId,tiendaId);
   }

   @Get(':productoId/stores/:tiendaId')
   async obtenerTiendaPorProductoIdTiendaId(@Param('productoId') productoId: string,@Param('tiendaId') tiendaId: string){
       return await this.productoTiendaService.obtenerTiendaPorProductoIdTiendaId(productoId, tiendaId);
   }

   @Get(':productoId/stores')
   async obtenerTiendasPorProducto(@Param('productoId') productoId: string){
       return await this.productoTiendaService.obtenerTiendasPorProducto(productoId);
   }

   @Put(':productoId/stores')
   async agregarTiendasAProducto(@Body() tiendasDto: TiendaDto[], @Param('productoId') productoId: string){
       const tiendas = plainToInstance(TiendaEntity, tiendasDto)
       return await this.productoTiendaService.agregarTiendasAProducto(productoId, tiendas);
   }


    @Delete(':productoId/stores/:tiendaId')
    @HttpCode(204)    
    async eliminarTiendaDeProducto(@Param('productoId') productoId: string,@Param('tiendaId') tiendaId: string){
       return await this.productoTiendaService.eliminarTiendaDeProducto(productoId,tiendaId);
   }

}
