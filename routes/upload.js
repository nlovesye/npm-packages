const router = require("koa-router")();
const fs = require("fs");
const { resolveLibraryDir } = require("../util");

router.prefix("/api/upload");

router.post(`/:videoName/:name`, async (ctx) => {
    try {
        const { videoName, name } = ctx.params;

        if (!videoName || !name) {
            throw new Error(`name不能为空`);
        }

        // 判断输出目录是否存在，不存在则创建
        const outputDir = resolveLibraryDir(`/${videoName}`);
        const outputDirIsExist = fs.existsSync(outputDir);
        if (!outputDirIsExist) {
            fs.mkdirSync(outputDir);
        }

        const file = ctx.request.files.file; // 获取上传文件

        // 创建可读流
        const rs = fs.createReadStream(file.path);

        const arr = file.name.split(".");
        if (2 > arr.length) {
            throw new Error("get ext error");
        }
        const ext = arr[arr.length - 1];

        // 上传的文件
        const targetFile = resolveLibraryDir(`/${videoName}/${name}.${ext}`);

        // 创建可写流
        const ws = fs.createWriteStream(targetFile);

        // 可读流通过管道写入可写流
        rs.pipe(ws);

        ctx.body = {
            message: "上传成功！",
            data: targetFile,
        };
    } catch (error) {
        console.log("api-upload", error);

        ctx.status = 500;
        ctx.body = { message: error.message || "未知错误" };
    }
});

module.exports = router;
