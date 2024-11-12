import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimientos } from './movimientos.entity';

@Injectable()
export class MovimientoService {
  constructor(
    @InjectRepository(Movimientos)
    private movimientosRepository: Repository<Movimientos>,
  ) {}

  async findAll(): Promise<Movimientos[]> {
    return this.movimientosRepository.find({
      relations: ['usuario', 'producto'],
    });
  }
}
