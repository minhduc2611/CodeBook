import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import UserAddInput from './inputs/user-add.input';

@Injectable()
export class UserService {
  // create(createUserInput: CreateUserInput) {
  //   return 'This action adds a new user';
  // }

  // findAll() {
  //   return `This action returns all user`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>
  ) {}

  async findAll(): Promise<User[]> {
    // return [
    //   { username: 'duc', _id: '1', password: 'ble' },
    //   { username: 'duc2', _id: '2', password: 'ble' }
    // ];
    return this.userRepository.find();
  }

  async create(input: UserAddInput): Promise<User> {
    const user = new User();
    user._id = uuidv4();
    user.username = input.username;
    user.password = input.password;
    return this.userRepository.save(user);
  }
}
