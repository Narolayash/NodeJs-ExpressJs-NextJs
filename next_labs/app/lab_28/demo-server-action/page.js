import React from "react";

async function demo_server_action() {
    'use server'

    console.log('This is server action')
}

function ServerAction_Demo() {
    return <>
        <button
            onClick={demo_server_action}
        >
            Server Action
        </button>
    </>;
}

export default ServerAction_Demo;
