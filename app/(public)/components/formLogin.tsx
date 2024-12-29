"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { schemaSignIn, type TSchemaSignIn } from "../../../lib/shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../../auth";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

function Login() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const formSignIn = useForm<TSchemaSignIn>({
        resolver: zodResolver(schemaSignIn),
        defaultValues: { usuario: "", contrasena: "" },
    });

    const onSubmit = async (data: TSchemaSignIn) => {
        startTransition(async () => {
            const response = await login(data);
            if (response.error) {
                formSignIn.setError("contrasena", { message: response.error });
                return;
            }
            router.push("/clientes");


        });
    };

    return (
        <Form {...formSignIn}>
            <form onSubmit={formSignIn.handleSubmit(onSubmit)} className="space-y-8">
                <FormField control={formSignIn.control} name="usuario" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Usuario</FormLabel>
                        <FormControl>
                            <Input {...field} placeholder="usuario" disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={formSignIn.control} name="contrasena" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contraseña</FormLabel>
                        <FormControl>
                            <Input {...field} type="password" placeholder="......." disabled={isPending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button type="submit">{isPending ? "Iniciando sesión..." : "Iniciar sesión"}</Button>
            </form>
        </Form>
    );
}

export default Login;
