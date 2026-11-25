
const {
  Controller,
  Post,
  Get,
  Body,
  Req,
  UseGuards
} = require('@nestjs/common');

const { AuthService } = require('./auth.service');
const { JwtAuthGuard } = require('./jwt-auth.guard');

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  login(body) {
    return this.authService.login(body);
  }

  profile(req) {
    return this.authService.getProfile(req.user.sub);
  }
}

Controller('auth')(AuthController);
require('@nestjs/common').Inject(AuthService)(AuthController, undefined, 0);

const prototype = AuthController.prototype;

Post('login')(
  prototype,
  'login',
  Object.getOwnPropertyDescriptor(prototype, 'login')
);
Body()(prototype, 'login', 0);

Get('me')(
  prototype,
  'profile',
  Object.getOwnPropertyDescriptor(prototype, 'profile')
);
UseGuards(JwtAuthGuard)(prototype, 'profile',
  Object.getOwnPropertyDescriptor(prototype, 'profile')
);
Req()(prototype, 'profile', 0);

module.exports = { AuthController };
