"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.caching = exports.superAdminApiKey = exports.redis = exports.logDirectory = exports.tokenInfo = exports.corsUrl = exports.db = exports.timezone = exports.port = exports.environment = void 0;
exports.environment = process.env.NODE_ENV;
exports.port = process.env.PORT;
exports.timezone = process.env.TZ;
exports.db = {
    name: process.env.DB_NAME || "",
    host: process.env.DB_HOST || "",
    port: process.env.DB_PORT || "",
    minPoolSize: parseInt(process.env.DB_MIN_POOL_SIZE || "5"),
    maxPoolSize: parseInt(process.env.DB_MAX_POOL_SIZE || "10"),
};
exports.corsUrl = process.env.CORS_URL;
exports.tokenInfo = {
    jwtSecret: process.env.JWT_SECRET || "",
    accessTokenValidity: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || "0"),
    refreshTokenValidity: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || "0"),
    issuer: process.env.TOKEN_ISSUER || "",
    audience: process.env.TOKEN_AUDIENCE || "",
};
exports.logDirectory = process.env.LOG_DIR;
exports.redis = {
    host: process.env.REDIS_HOST || "",
    port: parseInt(process.env.REDIS_PORT || "0"),
};
exports.superAdminApiKey = process.env.SUPER_ADMIN_API_KEY;
exports.caching = {
    contentCacheDuration: parseInt(process.env.CONTENT_CACHE_DURATION_MILLIS || "600000"),
};
//# sourceMappingURL=envConfigs.js.map