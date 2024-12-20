import {
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Body,
  // Headers,
  // Ip,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { UsersService } from './providers/users.service';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

/**
 * Controller class for '/users' API endpoint
 */
@Controller('users')
@ApiTags('Users')
export class UsersController {
  /**
   * Injects dependencies for the controller
   */
  constructor(private readonly usersService: UsersService) {}

  /**
   *  Public method responsible for handling the GET request send to '/users' route
   */
  @ApiOperation({
    summary: 'Fetches a list of registered users on the application.',
  })
  @ApiQuery({
    name: 'limit',
    type: String,
    description: 'The upper limit of pages you want the pagination to return',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: String,
    description:
      'The position of the page number that you want the API to return',
    required: false,
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @Get()
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(limit, page);
  }

  /**
   *  Public method responsible for handling the GET request send to '/users' route
   */
  @ApiOperation({
    summary: 'Fetches aregistered user on the application.',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully based on the query',
  })
  @Get('/:id?')
  public getUser(@Param() getUserParamDto: GetUsersParamDto) {
    return this.usersService.findOneById(getUserParamDto);
  }

  /**
   *  Public method responsible for handling the POST request send to '/users' route
   */
  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  /**
   * Public method responsible for handling the PATCH request send to '/users' route
   */
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
