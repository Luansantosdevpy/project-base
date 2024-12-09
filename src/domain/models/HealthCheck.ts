import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class HealthCheck extends Model {
  @Column({
    allowNull: false,
    defaultValue: true
  })
  healthy!: boolean;
}
