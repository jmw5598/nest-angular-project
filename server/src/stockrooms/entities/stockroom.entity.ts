import { Column, Entity, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from '../../accounts/entities/account.entity';
import { Location } from './location.entity';
import { StockItemDetails } from './stock-item-details.entity';

@Entity()
export class Stockroom extends BaseEntity {
  @Column({ nullable: false })
  public name: string;

  @Column({ nullable: false })
  public description: string;

  @ManyToOne(type => Account)
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @OneToMany(type => StockItemDetails, item => item.stockroom)
  public stockItems: StockItemDetails[];

  @OneToMany(type => Location, location => location.stockroom)
  public locations: Location[];
}
