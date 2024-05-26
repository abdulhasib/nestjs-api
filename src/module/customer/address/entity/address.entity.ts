import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'customer_address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address1: string;

  @Column()
  city: string;

  @Column()
  postalcode: string;

  @Column({ type: 'timestamptz' })
  created_at: Date;

  @Column({ type: 'timestamptz' })
  updated_at: Date;
}
