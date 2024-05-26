import { IsNumber, IsNotEmpty } from 'class-validator';

export class CreateNameChangeLogDto {
  @IsNumber()
  @IsNotEmpty()
  readonly customer_name_id: number;

  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

  @IsNotEmpty()
  readonly data: any;
}
