import Router from 'koa-router';
// import PublicController from "@/api/PublicController";

const router = new Router();

router.prefix('/public');

// router.get("/test", PublicController.test);
// router.get("/getCaptcha", PublicController.getCaptcha);

export default router;
