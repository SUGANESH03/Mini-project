
const {
  Injectable,
  UnauthorizedException,
  Inject
} = require('@nestjs/common');

const { JwtService } = require('@nestjs/jwt');

class JwtAuthGuard {
  constructor(jwtService) {
    this.jwtService = jwtService;
  }

  async canActivate(context) {
    const request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authentication token required');
    }

    const token = authorization.substring(7);

    try {
      request.user = await this.jwtService.verifyAsync(token);
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

Injectable()(JwtAuthGuard);
Inject(JwtService)(JwtAuthGuard, undefined, 0);

module.exports = { JwtAuthGuard };
