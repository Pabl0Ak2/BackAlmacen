import { Controller, Get } from '@nestjs/common';
import { Movimientos } from './movimientos.entity';
import { MovimientoService } from './movimientos.service';

@Controller('movimientos')
export class MovimientoController {
  constructor(private readonly movimientoService: MovimientoService) {}

  @Get()
  async findAll(): Promise<Movimientos[]> {
    return this.movimientoService.findAll();
  }
}
