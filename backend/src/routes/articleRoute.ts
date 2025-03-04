import { Router } from "express";
import { getArticleByAuthor, getArticleById, getArticleByTitle, getArticles, postArticle } from "../controllers/articleController";

const articleRouter = Router();

articleRouter.post('/', postArticle)
articleRouter.get('/:id', getArticleById)
articleRouter.get('/', getArticles)
articleRouter.get('/author/:authorId', getArticleByAuthor)
articleRouter.get('/title/:title', getArticleByTitle)

export default articleRouter;