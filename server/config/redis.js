import { createClient } from 'redis';

const connectRedis = createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});

connectRedis.on('error', err => console.log('Redis Client Error', err));

await connectRedis.connect();

await connectRedis.set('foo', 'bar');
const result = await connectRedis.get('foo');
console.log(result)  // >>> bar


export default connectRedis;