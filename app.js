const Koa = require("koa");
const json = require("koa-json");
const onerror = require("koa-onerror");
const koaBody = require("koa-body");
const logger = require("koa-logger");
const cors = require("koa2-cors");
const range = require("koa-range");
const serveStatic = require("koa-static");
const { historyApiFallback } = require("koa2-connect-history-api-fallback");

const allRoutes = require("./routes");
const { LIBRARY_ROOT, WEB_STATIC } = require("./config");

const app = new Koa();

// error handler
onerror(app);

app.use(cors());
app.use(
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 102400 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        },
    })
);
app.use(json());
app.use(logger());
app.use(range);

// 此中间件需在静态服务器中间件前使用，whiteList（白名单）中的路由不会被指向到打包应用的**index.html**文件。
app.use(historyApiFallback({ whiteList: ["/api"] }));
// 前端应用 static
app.use(serveStatic(WEB_STATIC));
// static
app.use(serveStatic(LIBRARY_ROOT));

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
for (const key in allRoutes) {
    if (allRoutes.hasOwnProperty(key)) {
        const api = allRoutes[key];
        app.use(api.routes(), api.allowedMethods());
    }
}

// error-handling
app.on("error", (err, ctx) => {
    console.error("server error", err, ctx);
});

module.exports = app;
