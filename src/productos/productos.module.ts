import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from './productos.entity';
import { Usuarios } from 'src/users/usuario.entity';
import { ProductoController } from './productos.controller';
import { ProductoService } from './productos.service';
import { Movimientos } from 'src/movimientos/movimientos.entity'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([Productos, Usuarios, Movimientos]),
  ],
  providers: [ProductoService],
  controllers: [ProductoController],
})
export class ProductoModule {}
