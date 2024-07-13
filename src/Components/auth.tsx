import '../index.css'
import { useState, useEffect, SetStateAction} from 'react'
import {Auth} from '@supabase/auth-ui-react'
import {ThemeSupa} from '@supabase/auth-ui-shared'
import Dashboard from "./dashboard.tsx";
import {Session} from "@supabase/supabase-js";
import useClient from "../hooks/useClient.tsx";

const Authentication: React.FC = () => {
    const client = useClient()
    const [session, setSession] = useState<Session | null>(null)

    useEffect(() => {
        client.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = client.auth.onAuthStateChange((_event: any, session: SetStateAction<Session | null>) => {
            setSession(session)
        })

        return () => {
            subscription?.unsubscribe()
        }
    }, [])

    if (!session) {
        return <Auth supabaseClient={client} appearance={{ theme: ThemeSupa }} />
    } else {
        return <Dashboard/>
    }
}

export default Authentication
