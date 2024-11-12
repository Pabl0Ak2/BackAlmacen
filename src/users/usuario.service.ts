import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Usuarios } from './usuario.entity';
import { CreateUsuarioDto } from './create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuarios)
    private usuarioRepository: Repository<Usuarios>,
  ) {}

  async registrar(createUsuarioDto: CreateUsuarioDto): Promise<Usuarios> {
    const { nombre, correo, contraseña, estatus, rol } = createUsuarioDto;
  
    const usuarioExistente = await this.usuarioRepository.findOne({ where: { correo } });
    if (usuarioExistente) {
      console.log('El correo ya está registrado');
      throw new Error('El correo ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    console.log('Contraseña cifrada:', hashedPassword);
  
    const nuevoUsuario = this.usuarioRepository.create({
      nombre,
      correo,
      contraseña: hashedPassword,
      estatus,
      rol,
    });
  
    console.log('Nuevo usuario a guardar:', nuevoUsuario);
  
    const savedUsuario = await this.usuarioRepository.save(nuevoUsuario);
    console.log('Usuario guardado:', savedUsuario);
  
    return savedUsuario;
  }
  
  async login(correo: string, contraseña: string): Promise<Usuarios | null> {
    const usuario = await this.usuarioRepository.findOne({ where: { correo } });
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const contrasenaValida = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!contrasenaValida) {
      throw new Error('Contraseña incorrecta');
    }

    return usuario;
  }
}
