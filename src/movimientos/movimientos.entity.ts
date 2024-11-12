import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Usuarios } from 'src/users/usuario.entity';
import { Productos } from 'src/productos/productos.entity';

@Entity('movimientos')
export class Movimientos {
  @PrimaryGeneratedColumn()
  idMovimiento: number;

  @Column()
  usuarioId: number;

  @Column()
  productoId: number;

  @Column({
    type: 'enum',
    enum: ['creacion'],
  })
  accion: 'creacion';

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  fechaHora: Date;

  @ManyToOne(() => Usuarios, usuario => usuario.idUsuario)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuarios;

  @ManyToOne(() => Productos, producto => producto.id_producto)
  @JoinColumn({ name: 'productoId' })
  producto: Productos;
}
