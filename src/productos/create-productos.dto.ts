import { IsString, IsInt, IsOptional, IsEnum } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre_producto: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsInt()
  cantidad_inventario: number;

  @IsEnum(['Activo', 'Inactivo'])
  estatus: 'Activo' | 'Inactivo';

  @IsInt()
  usuarioId: number; 
}
