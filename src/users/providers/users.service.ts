import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    /**
     * Injecting User repository into UsersService
     * */
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    // Check if user with email exists
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new Error(`User with email ${createUserDto.email} already exists.`);
    }

    // Try to create a new user
    // - Handle Exceptions Later
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);

    // Create the user
    return newUser;
  }

  /**
   * Method to find all the users
   */
  public async findAll(limit: number, page: number): Promise<User[]> {
    return await this.usersRepository.find({
      take: limit,
      skip: page * limit,
    });
  }

  /**
   * Find a user by ID
   */
  public async findOneById(getUserParamDto: GetUsersParamDto): Promise<User> {
    const { id } = getUserParamDto;
    return await this.usersRepository.findOne({ where: { id } });
  }
}
