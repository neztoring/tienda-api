import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { ErroresDeNegocioInterceptor } from '../compartido/interceptores/errores-de-negocio.interceptor';
import { ProductoService } from './producto.service';
import { ProductoEntity } from './producto.entity/producto.entity';
import { plainToInstance } from 'class-transformer';
import { ProductoDto } from './producto.dto/producto.dto';


@Controller('products')
@UseInterceptors(ErroresDeNegocioInterceptor)
export class ProductoController {
    constructor(private readonly productoService: ProductoService) {}

    @Get()
    async findAll() {
      return await this.productoService.findAll();
    }
  
    @Get(':productoId')
    async findOne(@Param('productoId', ParseUUIDPipe) productoId: string) {
      return await this.productoService.findOne(productoId);
    }
  
    @Post()
    async create(@Body() productoDto: ProductoDto) {
      const producto: ProductoEntity = plainToInstance(ProductoEntity, productoDto);
      return await this.productoService.create(producto);
    }
  
    @Put(':productoId')
    async update(@Param('productoId', ParseUUIDPipe) productoId: string, @Body() productoDto: ProductoDto) {
      const producto: ProductoEntity = plainToInstance(ProductoEntity, productoDto);
      return await this.productoService.update(productoId, producto);
    }
  
    @Delete(':productoId')
    @HttpCode(204)
    async delete(@Param('productoId', ParseUUIDPipe) productoId: string) {
      return await this.productoService.delete(productoId);
    }
}
