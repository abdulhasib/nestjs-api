import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNameDto {
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty()
  readonly lastname: string;
}
