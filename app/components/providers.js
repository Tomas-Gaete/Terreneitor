"use client";
import react, {ReactNode} from 'react';
import { SessionProvider } from 'next-auth/react';


const Providers = () =>{

    return (
        <sessionProvider> {Props.children}</sessionProvider>
    )
}

export default Providers;