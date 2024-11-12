import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('Productos')
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column({ type: 'varchar', length: 100 })
  nombre_producto: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @Column({ type: 'int', default: 0 })
  cantidad_inventario: number;

  @Column({
    type: 'enum',
    enum: ['Activo', 'Inactivo'],
    default: 'Activo',
  })
  estatus: 'Activo' | 'Inactivo';
}
