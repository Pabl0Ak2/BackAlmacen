import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuarios } from './users/usuario.entity';
import { UsuarioController } from './users/usuario.controller';
import { UsuarioService } from './users/usuario.service';
import { Productos } from './productos/productos.entity';
import { ProductoModule } from './productos/productos.module';
import { MovimientoModule } from './movimientos/movimientos.module';
import { Movimientos } from './movimientos/movimientos.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'almacen',
      entities: [Usuarios, Productos, Movimientos],
      synchronize: false,
      logging: true,
    }),
    TypeOrmModule.forFeature([Usuarios, Productos]),
    ProductoModule,
    MovimientoModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
