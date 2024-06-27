import { Router } from "express";
import * as proController from "../controllers/pros.js";
import * as authPro from "../controllers/authpro.js";
import verifyToken from "../middlewares/verifyToken.js";

const prosRouter = Router();

prosRouter.get("/me", verifyToken, authPro.getPro); // Route overlap
prosRouter
  .route("/")
  .get(proController.getAllPros)
  .post(proController.addNewPro);

prosRouter
  .route("/:id")
  .get(proController.getProById)
  .put(proController.updatePro)
  .delete(proController.deletePro);

prosRouter.route("/email/:email").get(proController.getProByEmail);

prosRouter.post("/register", authPro.signUp);
prosRouter.post("/login", authPro.logIn);
prosRouter.post("/logout", verifyToken, authPro.logout);
// prosRouter.patch("/:id", proController.addTagToPro);

export default prosRouter;
