import { Test, TestingModule } from '@nestjs/testing';
import { ProductoTiendaService } from './producto-tienda.service';
import { TypeOrmTestingConfig } from '../compartido/utilidades/typeorm-testing-config';

describe('ProductoTiendaService', () => {
  let service: ProductoTiendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoTiendaService],
    }).compile();

    service = module.get<ProductoTiendaService>(ProductoTiendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});


