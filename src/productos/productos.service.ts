import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Productos } from './productos.entity';
import { Usuarios } from 'src/users/usuario.entity';
import { CreateProductoDto } from './create-productos.dto';
import { Movimientos } from '../movimientos/movimientos.entity';

@Injectable()
export class ProductoService {
  constructor(
    @InjectRepository(Productos)
    private productoRepository: Repository<Productos>,
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
    @InjectRepository(Movimientos)
    private movimientosRepository: Repository<Movimientos>,
  ) {}

  async findActiveProducts(): Promise<Pick<Productos, 'id_producto' | 'nombre_producto' | 'cantidad_inventario'>[]> {
    return this.productoRepository.find({
      select: ['id_producto', 'nombre_producto', 'cantidad_inventario'],
      where: { estatus: 'Activo' },              
    });
  }

  async decreaseProductQuantity(idProducto: number): Promise<Productos> {
    const producto = await this.productoRepository.findOne({ where: { id_producto: idProducto } });

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    if (producto.cantidad_inventario <= 0) {
      throw new Error('No hay suficiente inventario');
    }

    producto.cantidad_inventario -= 1;
    return this.productoRepository.save(producto); 
  }

  async create(createProductoDto: CreateProductoDto): Promise<Productos> {
    const { nombre_producto, descripcion, cantidad_inventario, estatus, usuarioId } = createProductoDto;

    const usuario = await this.usuarioRepository.findOne({ where: { idUsuario: usuarioId } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const producto = this.productoRepository.create({
      nombre_producto,
      descripcion,
      cantidad_inventario,
      estatus,
      usuario,
    });

    const savedProducto = await this.productoRepository.save(producto);

    const movimiento = this.movimientosRepository.create({
      usuarioId: usuario.idUsuario,
      productoId: savedProducto.id_producto,
      accion: 'Entrada',
    });

    await this.movimientosRepository.save(movimiento);

    return savedProducto;
  }

  async findAll(): Promise<Productos[]> {
    return this.productoRepository.find({
      relations: ['usuario'],
    });
  }

  async updateStatus(idProducto: number, estatus: 'Activo' | 'Inactivo'): Promise<Productos> {
    const producto = await this.productoRepository.findOne({ where: { id_producto: idProducto } });
    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    if (estatus !== 'Activo' && estatus !== 'Inactivo') {
      throw new Error('Estatus inválido');
    }

    producto.estatus = estatus;
    return this.productoRepository.save(producto);
  }
  
}
