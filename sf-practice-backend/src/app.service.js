const { Injectable } = require('@nestjs/common');

class AppService {
  getHello() {
    return {
      message: 'SF Practice NestJS Backend is running!',
      status: 'success'
    };
  }
}

Injectable()(AppService);

module.exports = { AppService };
