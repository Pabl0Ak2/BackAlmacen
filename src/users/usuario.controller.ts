import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('register')
  async register(
    @Body('nombre') nombre: string,
    @Body('correo') correo: string,
    @Body('contraseña') contraseña: string,
    @Body('rol') rol: 'admin' | 'almacenista',
  ) {
    return this.usuarioService.register(nombre, correo, contraseña, rol);
  }

  @Post('login')
async login(
  @Body('correo') correo: string,
  @Body('contraseña') contraseña: string,
) {
  const usuario = await this.usuarioService.login(correo, contraseña);

  if (usuario) {
    return {
      message: 'Login exitoso',
      nombre: usuario.nombre,
      rol: usuario.rol,
    };
  } else {
    return { message: 'Credenciales incorrectas' };
  }
}

}
