import { Test, TestingModule } from '@nestjs/testing';
import { ProductoService } from './producto.service';
import { TypeOrmTestingConfig } from '../compartido/utilidades/typeorm-testing-config';

describe('ProductoService', () => {
  let service: ProductoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [ProductoService],
    }).compile();

    service = module.get<ProductoService>(ProductoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});