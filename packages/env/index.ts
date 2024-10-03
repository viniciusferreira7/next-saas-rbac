import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    SERVER_PORT: z.coerce.number().default(3333),

    DATABASE_URL: z.string().url(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),

    JWT_SECRET: z.string(),

    GITHUB_OAUTH_CLIENT_ID: z.string(),
    GITHUB_OAUTH_CLIENT_SECRET: z.string(),
    GITHUB_OAUTH_CLIENT_REDIRECT_URL: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    SERVER_PORT: process.env.SERVER_PORT,

    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_NAME: process.env.DATABASE_NAME,

    JWT_SECRET: process.env.JWT_SECRET,

    GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
    GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
    GITHUB_OAUTH_CLIENT_REDIRECT_URL:
      process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URL,
  },
  emptyStringAsUndefined: true,
})
