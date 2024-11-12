import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './users/usuario.entity';
import { UsuarioController } from './users/usuario.controller';
import { UsuarioService } from './users/usuario.service';
import { ProductosModule } from './productos/productos.module';
import { Producto } from './productos/productos.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'almacen',
      entities: [Usuario, Producto],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Usuario, Producto]),
    ProductosModule,
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class AppModule {}
