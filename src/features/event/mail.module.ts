import { Module } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserDocument } from '../user/model/user.scheme';
import { MailerService } from '@nestjs-modules/mailer';

@Module({})
export class EventModule {
  constructor(private readonly mailService: MailerService) {}

  //   event of monitoreo de create user
  @OnEvent('user.created')
  handleUserCreatedEvent(user: UserDocument) {
    console.log('user', user);
    this.mailService.sendMail({
      to: user.email,
      subject: 'Bienvenido a esta APP de NESTJS',
      template: 'welcome',
      context: {
        name: user.name
      }
    });
    //Enviar email
  }

  //   event of monitoreo de login
  @OnEvent('user.login')
  handleUserLoginEvent(user: UserDocument) {
    console.log('___login___', user);
  }
}
