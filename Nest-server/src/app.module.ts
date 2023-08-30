import { SysConfigModule } from './modules/system/sys-config/sys-config.module';
import { CommonModule } from './modules/common/common.module';
import { LoginModule } from './modules/login/login.module';
import { SharedModule } from './shared/shared.module';
import { ExistingProvider, Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/system/auth/auth.module';
import { UserModule } from './modules/system/user/user.module';
import { DictModule } from './modules/system/dict/dict.module';
import { NoticeModule } from './modules/system/notice/notice.module';
import { PostModule } from './modules/system/post/post.module';
import { DeptModule } from './modules/system/dept/dept.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { RoleModule } from './modules/system/role/role.module';
import { LogModule } from './modules/monitor/log/log.module';
import { OnlineModule } from './modules/monitor/online/online.module';
import { JobModule } from './modules/monitor/job/job.module';
import { ServerModule } from './modules/monitor/server/server.module';
import { JobService } from './modules/monitor/job/job.service';
import { CacheModule } from './modules/monitor/cache/cache.module';
import { IndexModule } from './modules/web/index/index.module';
import { CountryModule } from './modules/basic/country/country.module';
import { LanguageModule } from './modules/basic/language/language.module';
import { GenreModule } from './modules/basic/genre/genre.module';
import { ProfessionModule } from './modules/basic/profession/profession.module';
import { LevelModule } from './modules/basic/level/level.module';
import { ArticleModule } from './modules/content/article/article.module';
import { MovieBasicModule } from './modules/movie/basic/movie-basic.module';
import { MovieVideosModule } from './modules/movie/videos/movie-videos.module';
import { PubDateModule } from './modules/movie/pub-date/pub-date.module';
import { MovieLevelModule } from './modules/movie/movie-level/movie-level.module';
import { PhotosMovieModule } from './modules/photos/movie/photos-movie.module';
import { ActorListModule } from './modules/actor/actor-list/actor-list.module';
import { CastModule } from './modules/movie/cast/cast.module';
import { MovieRoleModule } from './modules/role/movie-role/movie-role.module';
import { RoleActorModule } from './modules/movie/role-actor/role-actor.module';
import { VideoModule } from './modules/video/video-list/video-list.module';
import { BannerModule } from './modules/basic/banner/banner.module';
import { ColumnModule } from './modules/column/column.module';
import { CollectModule } from './modules/collect/collect.module';
import { WebUserModule } from './modules/web/user/web-user.module';
import { WebAuthModule } from './modules/web/auth/web-auth.module';
import { UserCollectModule } from './modules/web/user-collect/user-collect.module';
import { LinkModule } from './modules/basic/link/link.module';
import { UserRateModule } from './modules/web/user-rate/user-rate.module';
import { UserSignModule } from './modules/web/user-sign/user-sign.module';
import { UserWalletModule } from './modules/web/user-wallet/user-wallet.module';
import { UserMovieModule } from './modules/web/user-movie/user-movie.module';

/* 将 provider的类名作为别名，方便定时器调用 */
const providers = [JobService];
function createAliasProviders(): ExistingProvider[] {
  const aliasProviders: ExistingProvider[] = [];
  for (const p of providers) {
    aliasProviders.push({
      provide: p.name,
      useExisting: p,
    });
  }
  return aliasProviders;
}
const aliasProviders = createAliasProviders();

@Module({
  imports: [
    /* 配置文件模块 */
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    /* 公共模块 */
    SharedModule,

    /* 系统业务模块 */
    CommonModule,
    LoginModule,
    AuthModule,
    UserModule,
    DictModule,
    SysConfigModule,
    NoticeModule,
    PostModule,
    DeptModule,
    MenuModule,
    RoleModule,
    LogModule,
    OnlineModule,
    JobModule,
    ServerModule,
    CacheModule,

    /* 影视类业务模块 */
    CountryModule,
    LanguageModule,
    GenreModule,
    ProfessionModule,
    LevelModule,
    MovieBasicModule,
    MovieVideosModule,
    MovieLevelModule,
    PubDateModule,
    PhotosMovieModule,
    ActorListModule,
    CastModule,
    MovieRoleModule,
    RoleActorModule,
    VideoModule,
    BannerModule,
    ColumnModule,
    CollectModule,
    LinkModule,
    UserRateModule,
    UserSignModule,
    UserWalletModule,
    UserMovieModule,

    /* 文章相关模块 */
    ArticleModule,

    /* web模块 */
    IndexModule,
    WebUserModule,
    WebAuthModule,
    UserCollectModule,
  ],
  providers: [...aliasProviders],
})
export class AppModule {}
