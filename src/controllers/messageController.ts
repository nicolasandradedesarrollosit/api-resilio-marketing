import Message from "../models/messageModel";
import { Request, Response } from "express";

export async function createMessage(req: Request, res: Response) {
  try {
    const { name, email, subject, message, origin } = req.body;
    const newMessage = new Message({ name, email, subject, message, origin });
    const savedMessage = await newMessage.save();
    return res.status(201).json({ message: 'Mensaje creado exitosamente', data: savedMessage });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error('Error creating message:', errorMessage);
    return res.status(500).json({ message: 'Error al crear el mensaje', error: errorMessage });
  }
}