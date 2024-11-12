import { IsString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUsuarioDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @IsNotEmpty()
  contraseña: string;

  @IsEnum(['activo', 'inactivo'])
  estatus: 'activo' | 'inactivo';

  @IsEnum(['admin', 'almacenista'])
  rol: 'admin' | 'almacenista';
}
