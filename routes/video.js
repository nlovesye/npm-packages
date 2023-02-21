const router = require("koa-router")();
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { resolveLibraryDir } = require("../util");

ffmpeg.setFfmpegPath(ffmpegPath);

router.prefix("/api/video");

router.get(`/list`, async (ctx) => {
    try {
        let statInfo = null;

        const allRootFiles = fs.readdirSync(resolveLibraryDir());

        const result = [];

        allRootFiles.forEach((f) => {
            statInfo = fs.statSync(resolveLibraryDir(f));

            if (statInfo.isDirectory()) {
                result.push(f);
            }
        });

        ctx.body = result;
    } catch (error) {
        console.log("api-video-list", error);

        ctx.status = 500;
        ctx.body = { message: error.message || "未知错误" };
    }
});

router.get(`/:name`, async (ctx) => {
    try {
        const { name } = ctx.params;
        if (!name || typeof name !== "string") {
            throw Error("error video name");
        }
        let statInfo = null;

        const allVideoDirs = fs.readdirSync(resolveLibraryDir(name));
        const subs = [];

        allVideoDirs.forEach((v) => {
            statInfo = fs.statSync(resolveLibraryDir(name, v));
            if (statInfo.isDirectory()) {
                subs.push({
                    name: v,
                    url: `${name}/${v}/${v}.m3u8`,
                });
            }
        });

        const result = {
            name,
            subs,
        };

        ctx.body = {
            message: "success",
            data: result,
        };
    } catch (error) {
        console.log("api-video-:name", error);
        ctx.status = 500;
        ctx.body = {
            message: error.message || "unkown Error",
            data: null,
        };
    }
});

// 视频分片
router.post("/split/:videoName/:name", async (ctx) => {
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

        // 判断输出目录是否存在，不存在则创建，存在则报错
        const outputFileDir = resolveLibraryDir(`/${videoName}/${name}`);
        const outputFileDirIsExist = fs.existsSync(outputFileDir);
        if (!outputFileDirIsExist) {
            fs.mkdirSync(outputFileDir);
        } else {
            throw new Error(`[${outputFileDir}]已存在或者正在进行分片，请检查`);
        }

        const outputFile = resolveLibraryDir(
            `/${videoName}/${name}/${name}.m3u8`
        );

        const file = ctx.request.files.file; // 获取上传文件

        // 创建可读流
        const rs = fs.createReadStream(file.path);

        // 上传的临时文件
        const tempOriginFile = resolveLibraryDir(`/${videoName}/${file.name}`);
        // 创建可写流
        const ws = fs.createWriteStream(tempOriginFile);

        // 处理流事件
        rs.on("error", function (err) {
            throw new Error(err);
        });

        ws.on("error", function (err) {
            throw new Error(err);
        });

        ws.once("close", function () {
            // console.log("可写流关闭了");
            // 进行视频切片
            ffmpeg(tempOriginFile)
                // .videoCodec("libx264") // 设置视频编解码器
                // .audioCodec('libfaac') // 设置 音频解码器
                .format("hls") // 输出视频格式
                .outputOptions("-hls_list_size 0") //  -hls_list_size n:设置播放列表保存的最多条目，设置为0会保存有所片信息，默认值为5
                .outputOption("-hls_time 10") // -hls_time n: 设置每片的长度，默认值为2。单位为秒
                .output(outputFile) // 输出文件
                .on("progress", (progress) => {
                    // 监听切片进度
                    const { percent } = progress;
                    console.log(`[${tempOriginFile}] processing: ${percent}%`);
                })
                .on("end", () => {
                    // 监听结束
                    console.log(`[${tempOriginFile}]视频切片完成`);
                    fs.unlink(tempOriginFile, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                })
                .on("error", (err) => {
                    throw err;
                })
                .run(); // 执行
        });

        // 可读流通过管道写入可写流
        rs.pipe(ws);

        ctx.body = {
            message: `上传成功，[${tempOriginFile}]正在进行视频分片，请耐心等待`,
            data: null,
        };
    } catch (error) {
        console.log("api-video-split:videoName: ", error);
        ctx.status = 500;
        ctx.body = {
            message: error.message || "unkown Error",
            data: null,
        };
    }
});

module.exports = router;
