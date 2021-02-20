import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'postgres',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'kanhasoft',
    entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
    synchronize: true,
};

