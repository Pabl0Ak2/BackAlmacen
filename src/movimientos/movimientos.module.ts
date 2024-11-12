import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimientos } from './movimientos.entity';
import { MovimientoService } from './movimientos.service';
import { MovimientoController } from './movimientos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Movimientos])],
  providers: [MovimientoService],
  controllers: [MovimientoController],
})
export class MovimientoModule {}
