import { Router } from "express";
import { CreateMessageDto } from "../dtos/message.dto";
import {validationMiddleware} from "../middlewares/middleware";
import { createMessage } from "../controllers/messageController";

const r = Router();

r.post('/messages', validationMiddleware(CreateMessageDto), createMessage);

export default r;