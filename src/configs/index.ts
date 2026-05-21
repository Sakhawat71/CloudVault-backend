import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    db_url: process.env.DATABASE_URL,
    jwt: {
        jwt_secret: process.env.JWT_SECRET,
        expiresin: process.env.JWT_EXPIRES_IN,
    },
    aws: {
        aws_region: process.env.AWS_REGION,
        bucket_name: process.env.AWS_BUCKET_NAME,
        access_key: process.env.AWS_ACCESS_KEY,
        secret_key: process.env.AWS_SECRET_KEY
    },
    clientSite_url: process.env.FRONTEND_URL,
}