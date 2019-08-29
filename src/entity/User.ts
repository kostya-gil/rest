import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum UserRole {
  ADMIN = 'admin',
  SECTION_VIEWER = 'section_viewer',
  SECTION_EDITOR = 'section_editor'
};

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
      unique: true
  })
  login: string

  @Column()
  password: string

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.SECTION_VIEWER
  })
  permissions: UserRole
}
