exports.constants = {
    ORIGIN: process.env.NODE_ENV === 'production' ? 'https://keval8solanki.github.io' : 'http://localhost:3000',
    COOKIE_CONFIG: {
        httpOnly: true,
        maxAge: 999999999,
        ...process.env.NODE_ENV === 'production' ? { sameSite: 'None', secure: true } : { sameSite: 'Strict' }
    },
    MONGO_DB_URI: process.env.MONGO_DB_URI,
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET_key,
    ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET_KEY
}