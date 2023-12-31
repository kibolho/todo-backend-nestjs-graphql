import { registerAs } from '@nestjs/config';
import {
  IsInt,
  IsOptional,
  Max,
  Min
} from 'class-validator';
import validateConfig from '../utils/validate-config';
import { AppConfig } from './config.type';

class EnvironmentVariablesValidator {
  @IsInt()
  @Min(0)
  @Max(65535)
  @IsOptional()
  APP_PORT: number;
}

export default registerAs<AppConfig>('app', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    port: process.env.APP_PORT
      ? parseInt(process.env.APP_PORT, 10)
      : process.env.PORT
      ? parseInt(process.env.PORT, 10)
      : 3000,
  };
});
