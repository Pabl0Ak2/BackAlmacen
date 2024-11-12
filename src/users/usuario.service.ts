import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async register(nombre: string, correo: string, contraseña: string, rol: 'admin' | 'almacenista'): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const newUser = this.usuarioRepository.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      estatus: 'activo',
      rol,
    });

    return this.usuarioRepository.save(newUser);
  }

  async login(correo: string, contraseña: string): Promise<any | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo } });
  
    if (!usuario) {
      return null; 
    }
  
    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isPasswordValid) {
      return null; 
    }
    return usuario;
  }

  async findOneById(id_usuario: number): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { idUsuario: id_usuario } });
  }
  
}
