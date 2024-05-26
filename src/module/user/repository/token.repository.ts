import { Repository } from 'typeorm';
import { TokenEntity } from '../../auth/entity/token.entity';

export class TokenRepository {
  constructor(private readonly repository: Repository<TokenEntity>) {}

  async findByRefreshToken(
    refreshToken: string,
  ): Promise<TokenEntity | undefined> {
    return this.repository.findOne({ where: { refresh_token: refreshToken } });
  }

  async deleteByRefreshToken(refreshToken: string): Promise<void> {
    await this.repository.delete({ refresh_token: refreshToken });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await this.repository.delete({ user: { id: userId } });
  }

  async deleteAllExpiredTokens(): Promise<void> {
    // Implement logic to delete expired tokens from the database
  }
}
