import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/prisma";


export const postArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const { title, content, image, authorId } = req.body;
    
    if (!authorId) {
        res.status(400).json({ message: "Semua data wajib diisi." });
        return;
    }
    const newArticle = await prisma.article.create({
        data: {
            title,
            content,
            image,
            authorId
        },
    });

    res.status(201).json(newArticle);
    } catch (error) {
    console.error(error);
    next(error)
    }
}

export const getArticleById = async (req: Request, res: Response, next : NextFunction) => {
    try{
        const { id } = req.params;
        if(!id){
            res.status(400).json({ message: "articleId wajib ada" });
        }

    const data = await prisma.article.findUnique({
        where: {
            id,
        }
    })
    res.status(201).json(data);
    } catch (error) {
        console.error(error);
        next(error)
    }
}

export const getArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await prisma.article.findMany()
        res.status(201).json(data)
    } catch (error) {
        console.error(error);
        next(error)
    }
}

export const getArticleByAuthor = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { authorId } = req.params;
        if (!authorId) {
            res.status(400).json({ message: "authorId wajib ada" });
        }

        const data = await prisma.article.findMany({
            where: { authorId },
            include: { author: true }
        });

        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

export const getArticleByTitle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title } = req.params;
        if(!title) {
            res.status(400).json({ message : "title harus ada"})
        }

        const data = await prisma.article.findFirst({
            where: { title },
        })
        if (!data) {
            res.status(404).json({ message: "Artikel tidak ditemukan" });
        }

        res.status(200).json(data);
    } catch (error) {
        
    }
}