import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field((type) => ID, { description: 'Shares the user name.' })
    name: string;

    @Field((type) => String, {
        description: 'Shares the user department details.',
    })
    department: string;
}
