import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "../modules/cars/useCases/ImportCategory/ImportCategoryController";
import { ListCategoriesController } from "../modules/cars/useCases/listCategories/ListCategoriesController";

const categoriesRoutes = Router();
const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
