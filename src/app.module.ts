import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [LoginModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
