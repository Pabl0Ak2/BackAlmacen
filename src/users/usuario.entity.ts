import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuarios')
export class Usuario {
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
}
