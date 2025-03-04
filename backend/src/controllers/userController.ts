import prisma from "../prisma/prisma";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

export const postUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, username, email, password, role } = req.body;
    
    if (!username || !password || !email) {
      res.status(400).json({ message: "Semua data wajib diisi." });
      return;
    }
    
    const hashedPassword = await bcrypt.hash(password,10);

    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        role, 
      },
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    next(error)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const { id } = req.params;
    if(!id){
      res.json({ message: "userId kosong"})
    }

    const data = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    next(error)
  }
}