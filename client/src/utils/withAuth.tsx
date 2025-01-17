import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { Container } from "../components/Container";
import { RootState } from "../store/store";

export enum AuthOption {
    REQUIRED = 'required',
    FORBIDDEN = 'forbidden',
    ANY = 'any'
}

export const withAuth = (option: AuthOption, Component: React.FC<{ data: any }>) => {
    const AuthenticatedComponent = () => {
        const router = useRouter()
        const [data, setData] = useState<boolean>(true)
        const [message, setMessage] = useState('')
        const userState = useSelector((state: RootState) => state.user)
        const { authenticated } = userState
        useEffect(() => {
            const getUser = async () => {
                // let { data } = await axios.get('/auth/me')
                // console.log(data)
                // let authenticated = data.user
                switch (option) {
                    case AuthOption.REQUIRED:
                        authenticated === true ? setData(true) : 
                        ( 
                            setData(false), 
                            router.push('/login'),
                            setMessage(`You need to be logged in`)
                        )
                        break;
                    case AuthOption.FORBIDDEN:
                        authenticated === false ? setData(true) : 
                        (
                            setData(false), 
                            router.push('/'),
                            setMessage(`You mustn't be logged in`)
                        )
                        break;
                    case AuthOption.ANY:
                        setData(true)
                        break;
                
                    default:
                        break;
                }
            }

            getUser()
        }, [])

        return (
            !!data ? <Component data={data} /> : 
            <>
            <Head>
                <title>Nest Next Boilerplate</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <div>
                    <h1 className="text-5xl">
                        {message}
                    </h1>
                </div>
            </Container>
            </>
        ) // Render whatever you want while the authentication occurs
    };

    return AuthenticatedComponent;
}