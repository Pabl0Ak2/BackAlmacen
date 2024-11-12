import { Usuarios } from 'src/users/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Productos {
  @PrimaryGeneratedColumn()
  id_producto: number;

  @Column()
  nombre_producto: string;

  @Column('text', { nullable: true })
  descripcion: string;

  @Column({ default: 0 })
  cantidad_inventario: number;

  @Column({ type: 'enum', enum: ['Activo', 'Inactivo'], default: 'Activo' })
  estatus: 'Activo' | 'Inactivo';

  @ManyToOne(() => Usuarios, usuario => usuario.productos)
  @JoinColumn({ name: 'usuarioId' })
  usuario: Usuarios;
}
