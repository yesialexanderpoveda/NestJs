import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateMessageDto } from "./dto/create-message-dto";
import { Message } from "./entyties/message.entity";

@Injectable()
export class MessageService{

  constructor (
  @InjectRepository(Message)
  private readonly messageRepository: Repository<Message>
  ) {}

  async getAll():Promise<Message[]>{
    return await this.messageRepository.find();
  }

  async createMessage(newMessage: CreateMessageDto): Promise<Message>{
    
    const message = new Message();
    message.message = newMessage.message;
    message.nick = newMessage.nick;


    return this.messageRepository.save(message)
  }
  
  async updateMessage(idMessage: number, updateMessage: CreateMessageDto): Promise<Message>{

    const messageUpdate =  await this.messageRepository.findOne(idMessage);
    messageUpdate.nick =  updateMessage.nick;
    messageUpdate.message = updateMessage.message;

    return this.messageRepository.save(messageUpdate);
  }

  async deleteMessage(idMessage: number): Promise<any>{
    return await this.messageRepository.delete(idMessage)
  }

}