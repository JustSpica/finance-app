import { hash } from "bcryptjs";

import { UserAlreadyExistError } from "./errors/user-already-exist.error";

import { UsersRepository } from "../repositories/@types/users-repository";

interface RegisterUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async handle({ email, name, password }: RegisterUserUseCaseRequest) {
    const usersWithSameEmail = await this.usersRepository.findByEmail(email);

    console.log(usersWithSameEmail);

    if (usersWithSameEmail) {
      throw new UserAlreadyExistError();
    }

    const password_hash = await hash(password, 6);

    const user = await this.usersRepository.create({
      email,
      name,
      password_hash,
    });

    return { user };
  }
}
