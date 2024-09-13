import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { ProductoEntity } from './producto.entity/producto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ProductoService],
  imports: [TypeOrmModule.forFeature([ProductoEntity])],
  controllers: [ProductoController]
  
})
export class ProductoModule {}


