import { useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from '../../contexts/AuthContext';

import { auth } from '../../services/firebaseConnection';
import { Container } from '../../components/container';
import { Input } from '../../components/input';
import logoImg from '../../assets/logo.svg';
import toast from 'react-hot-toast';

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Insira um email válido").min(1, "O campo e-mail é obrigatório"),
    password: z.string().min(6, "A senha deve ter mais de 5 caracteres")
})

type FormData = z.infer<typeof schema>

export function Register() {
    const navigate = useNavigate();
    const { handleInfoUser } = useContext(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout();
    }, [])

    async function onSubmit(data: FormData) {
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(async (user) => {
                await updateProfile(user.user, {
                    displayName: data.name,
                })

                handleInfoUser({
                    name: data.name,
                    email: data.email,
                    uid: user.user.uid
                })

                toast.success("Cadastrado com sucesso!")
                navigate("/dashboard", { replace: true })
            })
            .catch((error) => {
                console.log("Erro ao cadastrar usuários: ", error)
                toast.error("Erro ao se cadastrar")
            })
    }

    return (
        <Container>
            <div className='w-full min-h-screen flex justify-center items-center flex-col gap-4'>
                <Link to="/" className='mb-6 max-w-sm w-full'>
                    <img
                        src={logoImg}
                        alt='Logo do Site'
                        className='w-full'>
                    </img>
                </Link>

                <form
                    className='bg-white max-w-xl w-full rounded-lg p-4'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='mb-3'>
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo"
                            name="name"
                            error={errors.name?.message}
                            register={register}
                        />
                    </div>

                    <div className='mb-3'>
                        <Input
                            type="email"
                            placeholder="Digite o seu e-mail"
                            name="email"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>

                    <div className='mb-3'>
                        <Input
                            type="password"
                            placeholder="Digite sua senha"
                            name="password"
                            error={errors.password?.message}
                            register={register}
                        />
                    </div>

                    <button
                        className='bg-zinc-900 w-full rounded-md text-white h-10 font-medium'
                        type='submit'
                    >
                        Cadastrar
                    </button>
                </form>

                <Link to={"/login"}>
                    Já possui uma conta? Faça o login!
                </Link>

            </div>
        </Container>
    )
}

