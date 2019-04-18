import { Table, Column, Model, HasMany, BelongsTo, ForeignKey, BeforeSave } from 'sequelize-typescript';
import { Company } from "./company.model";
import * as bcrypt from 'bcrypt';
import to from 'await-to-js';
import * as jsonwebtoken from'jsonwebtoken';
import { ENV } from '../config';

@Table({timestamps: true})
export class User extends Model<User> {

  @Column({primaryKey: true, autoIncrement: true})
  id: number;

  @Column
  name: string;

  @Column
  avatar: string;

  @Column({unique: true})
  phone: string;

  @Column({unique: true})
  email: string;

  @Column
  password: string;

  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  token: string;
  login: boolean;

  @Column({unique: true})
  socialNetwork: string;


  @BeforeSave
  static async hashPassword(user: User) {
    let err;
    if (user.changed('password')){
        let salt, hash;
        [err, salt] = await to(bcrypt.genSalt(10));
        if(err) {
          throw err;
        }

        [err, hash] = await to(bcrypt.hash(user.password, salt));
        if(err) {
          throw err;
        }
        user.password = hash;
    }
  }

  async comparePassword(pw) {
      let err, pass;
      if(!this.password) {
        throw new Error('Does not have password');
      }

      [err, pass] = await to(bcrypt.compare(pw, this.password));
      if(err) {
        throw err;
      }

      if(!pass) {
        throw 'Invalid password';
      }

      return this;
  };

  getToken(){
      return 'Bearer ' + jsonwebtoken.sign({
          id: this.id,
      }, ENV.JWT_ENCRYPTION, { expiresIn: ENV.JWT_EXPIRATION });
  }

  static async upsertFbUser({ accessToken, refreshToken, profile }) {
      const user = await User.findOne({ where: { socialNetwork: `facebook_${profile.id}` } });
      if (!user) {
          const [err, newUser] = await to(User.create({
              name: profile.displayName || `${profile.familyName} ${profile.givenName}`,
              email: profile.emails[0].value,
              socialNetwork: `facebook_${profile.id}`,
          }));
          return newUser;
      }
      return user;
  };

}
