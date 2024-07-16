import { Container } from "../../../components/container";
import { DashboradHeader } from "../../../components/panelheader";
import { FiUpload } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { Input } from '../../../components/input'
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    model: z.string().min(1, "O Modelo é obrigatório"),
    year: z.string().min(1, "O Ano do carro é obrigatório"),
    km: z.string().min(1, "O KM do carro é obrigatório"),
    price: z.string().min(1, "O preço é obrigatório"),
    city: z.string().min(1, "A cidade é obrigatória"),
    whatsapp: z.string().min(1, "O telefone é obrigatório").refine((value) => /^(\d{10,12})$/.test(value), {
        message: "Numero de telefone inválido."
    }),
    description: z.string().min(1, "A descrição é obrigatória!")
})

type FormData = z.infer<typeof schema>;

export function New() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    function onSubmit(data: FormData){
        console.log(data)
    }

    return (
        <Container>
            <DashboradHeader/>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
                <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
                    <div className="absolute cursor-pointer">
                        <FiUpload size={30} color="#000"/>
                    </div>
                    <div className="cursor-pointer">
                        <input className="opacity-0 cursor-pointer" type="file" accept="image/*"/>
                    </div>
                </button>
            </div>

            <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
                <form 
                    className="w-full"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="mb-3">
                        <p className="mb-2 font-medium">Nome do Carro</p>
                        <Input 
                            type="text"
                            register={register}
                            name="name"
                            error={errors.name?.message}
                            placeholder="Ex: Celta 1.0"
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Modelo do carro</p>
                        <Input 
                            type="text"
                            register={register}
                            name="model"
                            error={errors.model?.message}
                            placeholder="Ex: 1.0 flex 4p"
                        />
                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">Ano</p>
                            <Input 
                                type="text"
                                register={register}
                                name="year"
                                error={errors.year?.message}
                                placeholder="Ex: 2023/2024"
                            />
                        </div>
                        <div className="w-full">
                            <p className="mb-2 font-medium">Km rodados</p>
                            <Input 
                                type="text"
                                register={register}
                                name="km"
                                error={errors.km?.message}
                                placeholder="Ex: 65.700"
                            />
                        </div>
                    </div>

                    <div className="flex w-full mb-3 flex-row items-center gap-4">
                        <div className="w-full">
                            <p className="mb-2 font-medium">Telefone | Whatsapp</p>
                            <Input 
                                type="text"
                                register={register}
                                name="whatsapp"
                                error={errors.whatsapp?.message}
                                placeholder="Ex: 041 99123-1234"
                            />
                        </div>
                        <div className="w-full">
                            <p className="mb-2 font-medium">Cidade</p>
                            <Input 
                                type="text"
                                register={register}
                                name="city"
                                error={errors.city?.message}
                                placeholder="Ex: Curitiba"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Preço:</p>
                        <Input 
                            type="text"
                            register={register}
                            name="price"
                            error={errors.price?.message}
                            placeholder="Ex: 125.000"
                        />
                    </div>

                    <div className="mb-3">
                        <p className="mb-2 font-medium">Descrição</p>
                        <textarea 
                            className="border-2 w-full rounded-md h-24 px-2"
                            {...register("description")}
                            name="description"
                            id="description"
                            placeholder="Digite a descriação completa sobre o carro..." 
                        />
                        {errors.description && <p className="mb-1 text-red-500">{errors.description.message}</p>}
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full rounded-md bg-zinc-900 text-white font-medium h-10">
                        Cadastrar
                    </button>

                </form>
            </div>
        </Container>
    )
}

