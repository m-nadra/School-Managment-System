"use server"

import { redirect } from "next/navigation"

export default async function login(formData: FormData) {
    try {
        const response = await fetch("http://backend:5000/api/token", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password")
            })
        })
        if (!response.ok)
            throw Error("Error")
    }
    catch (error) {
        console.error(error)
    }
    redirect("/dashboard")
} 