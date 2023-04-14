import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'user-collect' })
export class UserCollect {
  @PrimaryColumn({
    name: 'user_id',
    comment: '用户id',
  })
  userId: number;

  @PrimaryColumn({
    name: 'movie_id',
    comment: '影视id',
  })
  movieId: number;
}
