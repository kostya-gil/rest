import { Entity, Tree, PrimaryGeneratedColumn, Column, CreateDateColumn, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree('closure-table')
export default class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  parentId: number;

  @Column()
	name: string;
		
	@TreeChildren()
  children: Section[];

  @TreeParent()
  parent: Section;

  @CreateDateColumn({ name: 'created_at', nullable: true })
  createdAt: Date;
}