
const { Module } = require('@nestjs/common');
const { JwtModule } = require('@nestjs/jwt');

const { AuthController } = require('./auth.controller');
const { AuthService } = require('./auth.service');
const { JwtAuthGuard } = require('./jwt-auth.guard');

class AuthModule {}

Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1d'
      }
    })
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtAuthGuard
  ],

  exports: [
    JwtModule,
    JwtAuthGuard
  ]
})(AuthModule);

module.exports = { AuthModule };
