import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './productos.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productosRepository: Repository<Producto>,
  ) {}

  async obtenerTodosLosProductos(): Promise<Producto[]> {
    return await this.productosRepository.find();
  }
async crearProducto(
    nombre_producto: string, 
    descripcion: string, 
    cantidad_inventario: number
  ): Promise<Producto> {
    const producto = this.productosRepository.create({
      nombre_producto,
      descripcion,
      cantidad_inventario,  
      estatus: 'Activo',     
    });
    return await this.productosRepository.save(producto);
  }
  
  async actualizarCantidad(id_producto: number, cantidad: number): Promise<Producto> {
    const producto = await this.productosRepository.findOne({ where: { id_producto } });
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    if (producto.cantidad_inventario + cantidad < 0) {
      throw new Error('No hay suficiente stock para disminuir');
    }
  
    producto.cantidad_inventario += cantidad;
    return await this.productosRepository.save(producto);
  }
  
  async actualizarDescripcion(id_producto: number, descripcion: string): Promise<Producto> {
    const producto = await this.productosRepository.findOne({ where: { id_producto } });
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    producto.descripcion = descripcion;
    return await this.productosRepository.save(producto);
  }

  async cambiarEstatus(id_producto: number, estatus: 'Activo' | 'Inactivo'): Promise<Producto> {
    const producto = await this.productosRepository.findOne({ where: { id_producto } });
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    producto.estatus = estatus;
    return await this.productosRepository.save(producto);
  }

  async obtenerProductosActivos(): Promise<Producto[]> {
    return await this.productosRepository.find({
      where: { estatus: 'Activo' },
    });
  }
  
}
