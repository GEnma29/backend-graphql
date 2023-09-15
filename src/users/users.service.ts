import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model, Types } from 'mongoose';
import { CreateUserInput, PaginationResponse } from 'src/graphql';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    const newUser = {
      _id: new Types.ObjectId() as any,
      ...createUserInput,
    };
    const user = await this.userModel.create(newUser);
    return user;
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async PaginateUsers(
    page: number,
    limit: number,
  ): Promise<PaginationResponse> {
    const users =
      (await this.userModel
        .find({})
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })) || ([] as any);
    const count = await this.userModel.countDocuments();
    return {
      users,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async findOne(id: string) {
    return await this.userModel.findById(id);
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }
}
