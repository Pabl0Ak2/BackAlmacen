import { Productos } from 'src/productos/productos.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Usuarios {
  @PrimaryGeneratedColumn()
  idUsuario: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  correo: string;

  @Column()
  contraseña: string;

  @Column({ type: 'enum', enum: ['activo', 'inactivo'] })
  estatus: 'activo' | 'inactivo';

  @Column({ type: 'enum', enum: ['admin', 'almacenista'] })
  rol: 'admin' | 'almacenista';

  @OneToMany(() => Productos, producto => producto.usuario)
  productos: Productos[];
}
