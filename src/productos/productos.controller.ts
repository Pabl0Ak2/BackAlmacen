import { Controller, Post, Body, Get, Put, Param } from '@nestjs/common';
import { ProductoService } from './productos.service';
import { CreateProductoDto } from './create-productos.dto';
import { Productos } from './productos.entity';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post('crear')
  async create(@Body() createProductoDto: CreateProductoDto) {
    return this.productoService.create(createProductoDto);
  }

  @Get('activos')
  async getActiveProducts() {
    return this.productoService.findActiveProducts();
  }

  @Put('disminuir-cantidad/:idProducto')
  async decreaseProductQuantity(@Param('idProducto') idProducto: number) {
    return this.productoService.decreaseProductQuantity(idProducto);
  }

  @Get()
  async findAll(): Promise<Productos[]> {
    return this.productoService.findAll();
  }

  @Put(':idProducto/estatus')
  async updateStatus(@Param('idProducto') idProducto: number, @Body() body: { estatus: 'Activo' | 'Inactivo' }): Promise<Productos> {
    return this.productoService.updateStatus(idProducto, body.estatus);
  }
}
