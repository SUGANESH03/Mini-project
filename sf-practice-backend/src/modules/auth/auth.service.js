
const {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject
} = require('@nestjs/common');

const { InjectDataSource } = require('@nestjs/typeorm');
const { JwtService } = require('@nestjs/jwt');
const bcrypt = require('bcryptjs');
const { User } = require('../../entities/user.entity');

class AuthService {
  constructor(dataSource, jwtService) {
    this.dataSource = dataSource;
    this.jwtService = jwtService;
  }

  get users() {
    return this.dataSource.getRepository(User);
  }

  // Automatically create initial admin during startup
  async onModuleInit() {
    await this.createInitialAdmin();
  }

  // Login
  async login(data) {
    const email = String(data?.Email || '').trim().toLowerCase();
    const password = String(data?.Password || '');

    if (!email || !password) {
      throw new BadRequestException(
        'Email and password are required'
      );
    }

    const user = await this.users
      .createQueryBuilder('user')
      .addSelect('user.PasswordHash')
      .where('LOWER(user.Email) = :email', { email })
      .getOne();

    if (!user || !user.IsActive) {
      throw new UnauthorizedException(
        'Invalid email or password'
      );
    }

    const validPassword = await bcrypt.compare(
      password,
      user.PasswordHash
    );

    if (!validPassword) {
      throw new UnauthorizedException(
        'Invalid email or password'
      );
    }

    const payload = {
      sub: user.Id,
      email: user.Email,
      role: user.Role
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
      user: {
        Id: user.Id,
        Name: user.Name,
        Email: user.Email,
        Role: user.Role
      }
    };
  }

  // Get logged-in user profile
  async getProfile(userId) {
    const user = await this.users.findOne({
      where: { Id: userId }
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      Id: user.Id,
      Name: user.Name,
      Email: user.Email,
      Role: user.Role
    };
  }

  // Create initial admin account
  async createInitialAdmin() {
    const email = String(
      process.env.ADMIN_EMAIL || ''
    ).trim().toLowerCase();

    const password = process.env.ADMIN_PASSWORD || '';
    const name = process.env.ADMIN_NAME || 'System Administrator';

    if (!email || !password) {
      console.warn(
        'Initial admin not created: set ADMIN_EMAIL and ADMIN_PASSWORD in .env'
      );
      return;
    }

    const existing = await this.users.findOne({
      where: { Email: email }
    });

    if (existing) {
      return;
    }

    const PasswordHash = await bcrypt.hash(password, 12);

    await this.users.save(
      this.users.create({
        Name: name,
        Email: email,
        PasswordHash,
        Role: 'ADMIN',
        IsActive: true
      })
    );

    console.log(`Initial admin created: ${email}`);
  }
}

Injectable()(AuthService);
InjectDataSource()(AuthService, undefined, 0);
Inject(JwtService)(AuthService, undefined, 1);

module.exports = { AuthService };
