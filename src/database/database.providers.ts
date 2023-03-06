import * as mongoose from 'mongoose';

export const dbString =
  'mongodb://127.0.0.1:27017/cats_db?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.8.0';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> => mongoose.connect(dbString),
  },
];
