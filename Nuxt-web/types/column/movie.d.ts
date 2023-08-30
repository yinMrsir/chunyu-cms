export type UserMovieBase = { movieId: number; userId: number } | null

export type UserRate = { rate: number } & NonNullable<UserMovieBase> | null
