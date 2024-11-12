import { Controller, Post, Body } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './create-usuario.dto';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post('registrar')
  async registrar(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.registrar(createUsuarioDto);
  }

  @Post('login')
  async login(@Body() loginDto: { correo: string, contraseña: string }) {
    const { correo, contraseña } = loginDto;
    return this.usuarioService.login(correo, contraseña);
  }
}
