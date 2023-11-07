import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async isUserExist(request: string | number): Promise<any> {
    const users = await this.getUsers();

    return users.find(
      (user) => user.username === request || user.id === request,
    );
  }

  async getUsers(): Promise<Users[]> {
    const response = await fetch('http://localhost:5000/users');
    return await response.json();
  }

  async createUser(body: CreateUser): Promise<object | string> {
    const isUserExist = await this.isUserExist(body.username);

    if (isUserExist) {
      return 'Username already use';
    }

    await fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
        isOnline: true,
      }),
    });

    return body;
  }

  async updateUser(id: number, body: any): Promise<any> {
    const isUserExist = await this.isUserExist(id);

    if (!isUserExist) return 'User not found';

    await fetch(`http://localhost:5000/users/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: body.username,
      }),
    });

    return {
      username: body.username,
    };
  }

  async deleteUser(id: number): Promise<any> {
    const isUserExist = await this.isUserExist(id);

    if (!isUserExist) return 'User not found';

    const deleteUser = await fetch(`http://localhost:5000/users/${id}`, {
      method: 'DELETE',
    });
    return deleteUser;
  }
}

export class Users {
  id: number;
  username: string;
  isOnline: boolean;
}

interface CreateUser {
  username: string;
}
