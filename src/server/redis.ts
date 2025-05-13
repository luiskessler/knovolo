import Redis from 'ioredis';

const redisUser = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  db: 0,
});

const redisOrganization = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  db: 1,
});

export default redisUser;