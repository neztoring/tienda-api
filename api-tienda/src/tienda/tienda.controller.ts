import { Body, Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Put, UseInterceptors } from '@nestjs/common';
import { TiendaService } from './tienda.service';
import { TiendaDto } from './tienda.dto/tienda.dto';
import { TiendaEntity } from './tienda.entity/tienda.entity';
import { plainToInstance } from 'class-transformer';
import { ErroresDeNegocioInterceptor } from '../compartido/interceptores/errores-de-negocio.interceptor';

@Controller('stores')
@UseInterceptors(ErroresDeNegocioInterceptor)
export class TiendaController {
    constructor(private readonly tiendaService: TiendaService) {}

    @Get()
    async findAll() {
      return await this.tiendaService.findAll();
    }
  
    @Get(':tiendaId')
    async findOne(@Param('tiendaId', ParseUUIDPipe) tiendaId: string) {
      return await this.tiendaService.findOne(tiendaId);
    }
  
    @Post()
    async create(@Body() tiendaDto: TiendaDto) {
      const tienda: TiendaEntity = plainToInstance(TiendaEntity, tiendaDto);
      return await this.tiendaService.create(tienda);
    }
  
    @Put(':tiendaId')
    async update(@Param('tiendaId', ParseUUIDPipe) tiendaId: string, @Body() tiendaDto: TiendaDto) {
      const tienda: TiendaEntity = plainToInstance(TiendaEntity, tiendaDto);
      return await this.tiendaService.update(tiendaId, tienda);
    }
  
    @Delete(':tiendaId')
    @HttpCode(204)
    async delete(@Param('tiendaId', ParseUUIDPipe) tiendaId: string) {
      return await this.tiendaService.delete(tiendaId);
    }
}


