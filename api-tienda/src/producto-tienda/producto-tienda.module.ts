import { Module } from '@nestjs/common';
import { ProductoTiendaService } from './producto-tienda.service';
import { ProductoTiendaController } from './producto-tienda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductoEntity } from '../producto/producto.entity/producto.entity';
import { TiendaEntity } from '../tienda/tienda.entity/tienda.entity';

@Module({
  providers: [ProductoTiendaService],
  imports: [TypeOrmModule.forFeature([ProductoEntity,TiendaEntity])],
  controllers: [ProductoTiendaController]
})
export class ProductoTiendaModule {}
