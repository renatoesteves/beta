import {prismaClient} from '../../prisma'
import {hash} from 'bcryptjs'

interface UserRequest{
    name: string;
    email: string;
    password: string;
}

class CreateUserService{
    async execute({name, email, password}: UserRequest){ 
       //Verificar se o usuário enviou o e-mail
       if(!email){
        throw new Error("Email não preenchido ou incorreto.")
       }

       //Verificar se esse email já está cadastrado na plataforma
       const userAlreadyExists = await prismaClient.user.findFirst({
        where:{
            email: email
        }
       })

       if(userAlreadyExists){
        throw new Error ("Email já cadastrado.")
       }
    
    //Criptografando a senha com hash de 8
    const passwordHash = await hash(password, 8)


    const user = await prismaClient.user.create({
        data:{
            name: name,
            email: email,
            password: passwordHash,
        },
        select:{
            id: true,
            name: true,
            email: true,
        }
        })

    return user;
    }
}

export { CreateUserService }