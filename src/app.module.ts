import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

import { FeaturesModule } from './features/features.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    FeaturesModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI, {
      // connectionFactory: (connection) => {
      //   connection.plugin(require('mongoose-delete'), {
      //     overrideMethods: 'all',
      //   });
      //   return connection;
      // },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/client')
    })
  ],
  providers: [AppService]
})
export class AppModule {}
