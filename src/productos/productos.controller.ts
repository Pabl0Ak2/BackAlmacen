import { Controller, Post, Body, Param, Put, Get } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Producto } from './productos.entity';

@Controller('productos')
export class ProductosController {
  constructor(private readonly productosService: ProductosService) {}

  @Get()
  async obtenerTodosLosProductos(): Promise<Producto[]> {
    return this.productosService.obtenerTodosLosProductos();
  }
  
@Post('crear')
async crearProducto(
  @Body('nombre_producto') nombre_producto: string,
  @Body('descripcion') descripcion: string,
  @Body('cantidad_inventario') cantidad_inventario: number,
): Promise<Producto> {
  return this.productosService.crearProducto(nombre_producto, descripcion, cantidad_inventario);
}

@Put('actualizar-cantidad/:id_producto')
  async actualizarCantidad(
    @Param('id_producto') id_producto: number,
    @Body('cantidad') cantidad: number,
  ): Promise<Producto> {
    return this.productosService.actualizarCantidad(id_producto, cantidad);
  }

  @Put('actualizar-descripcion/:id_producto')
  async actualizarDescripcion(
    @Param('id_producto') id_producto: number,
    @Body('descripcion') descripcion: string,
  ): Promise<Producto> {
    return this.productosService.actualizarDescripcion(id_producto, descripcion);
  }

  @Put(':id_producto/estatus')
  async cambiarEstatus(
    @Param('id_producto') id_producto: number,
    @Body('estatus') estatus: 'Activo' | 'Inactivo', 
  ) {
    return this.productosService.cambiarEstatus(id_producto, estatus);
  }

  @Get('activos')
async obtenerProductosActivos(): Promise<Producto[]> {
  return this.productosService.obtenerProductosActivos();
}

}
