import { IsString, IsOptional, IsInt, Min } from 'class-validator';

export class UpdateProductoDto {
  @IsOptional()
  @IsString()
  nombre_producto?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  cantidad_inventario?: number;

  @IsOptional()
  @IsString()
  estatus?: 'Activo' | 'Inactivo';
}
