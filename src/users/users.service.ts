import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model, Types } from 'mongoose';
import {
  CreateUserInput,
  PaginationResponse,
  UpdateUserInput,
} from 'src/graphql';
import { generateHash } from 'src/utils/handleBcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserInput: CreateUserInput) {
    const newUser = {
      ...createUserInput,
      _id: new Types.ObjectId() as any,
      password: await generateHash(createUserInput.password),
    };
    const user = await this.userModel.create(newUser);
    return user;
  }

  async findAll() {
    return await this.userModel.find({});
  }

  async userLogin(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { isLogin: true } },
    );
    return user;
  }
  async userLogout(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { isLogin: false } },
    );
    return user;
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
    const user: User = await this.userModel.findById(id);
    return user;
  }

  async findByEmail(email: string) {
    const user: User = await this.userModel.findOne({ email: email });
    return user;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const user = this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserInput },
    );
    return user;
  }

  remove(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }
}
