import React, { createContext, useContext, useState, useMemo } from "react";
import { BloctoWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import useCusToast from '../hooks/useCusToast';

import CONTRACT_ADDR from '../constant'

const Context = createContext();

export function useWalletContext() {
    return useContext(Context);
}

export function ContextProvider({ children }) {
    const { connect, connected, signAndSubmitTransaction } = useWallet()
    const { toastSeccess, toastError } = useCusToast()
    const [isLoading, setLoading] = useState(false);

    const checkLogin = async () => {
        if (connected) {
            return true
        }
        await connect(BloctoWalletName)
        return false
    }

    const signAndSubmitTransactionFnc = async (payload,
        options = {
            max_gas_amount: "20000",
            gas_unit_price: "200",
        }) => {
        try {
            setLoading(true);
            const { hash } = await signAndSubmitTransaction(payload, options);
            if (hash) {
                return hash;
            }
            throw new Error('hash is null');
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false)
        }
    }
    const mint = async (functionName) => {
        const isLogin = await checkLogin()
        if (!isLogin) return null
        if (isLoading) return null
        const shovel = {
            arguments: [],
            function: `${CONTRACT_ADDR}::urn_to_earn::${functionName}`,
            type: 'entry_function_payload',
            type_arguments: [],
        };
        const hash = await signAndSubmitTransactionFnc(shovel);
        if (hash) {
            toastSeccess(hash)
        } else {
            toastError('error')
        }
        return null
    }

    const value = useMemo(() => ({
        mint,
        checkLogin,
        connect,
        connected,
        signAndSubmitTransaction,
        isLoading
    }), [connect, connected, mint, signAndSubmitTransaction, isLoading]);


    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}