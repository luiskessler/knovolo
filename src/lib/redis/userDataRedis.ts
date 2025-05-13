import type { User } from "@prisma/client";
import redisUser from "~/server/redis";

export const getUserFromCache = async (userId: string) => {
    try {
      const user = await redisUser.get(`user:${userId}`);
      if (user) {
        return JSON.parse(user);
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching user from cache:', error);
      return null;
    }
  };
  
  export const setUserInCache = async (userId: string, userData: any) => {
    try {
      await redisUser.set(`user:${userId}`, JSON.stringify(userData), 'EX', 3600);
    } catch (error) {
      console.error('Error saving user to cache:', error);
    }
  };