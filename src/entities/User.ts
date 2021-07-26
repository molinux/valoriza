import {Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn} from 'typeorm';

import { v4 as uuid } from 'uuid';

// Entity = referencia a tabela users
@Entity('users')
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  admin: boolean;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
  	// Se o id estiver vazio (novo usuário), irá criar o mesmo
  	if(!this.id) {
  		this.id = uuid();
  	}
  }
}

export { User };