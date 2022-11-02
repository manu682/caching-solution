import { Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { User } from './user.model';

const pubSub = new PubSub();

@Resolver((of: any) => User)
export class UsersResolver {
    @Query((returns) => [User!]!, {
        name: 'users',
    })
    usersQuery(): Promise<Array<User>> {
        const users: Array<User> = [{ name: 'Rob', department: 'maintenance' }];
        return new Promise((resolve) => {
            resolve(users);
        });
    }

    @Subscription((returns) => [User!]!, {
        name: 'users',
        resolve: value => value,
    })
    async usersSubscription(): Promise<AsyncIterator<User, any, undefined>> {
        return pubSub.asyncIterator('users');
    }

    @Mutation((returns) => String)
    async addUser(): Promise<string> {
        const users: Array<User> = [{ name: 'Rob', department: 'maintenance' }];
        pubSub.publish('users', users);

        return new Promise((resolve, reject) => {
            resolve("success");
        });;
    }
}