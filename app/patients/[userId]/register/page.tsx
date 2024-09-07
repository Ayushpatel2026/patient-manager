import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";

const Register = async ({params: {userId}} : SearchParamProps) => {
    // we can take the userId from the url and use it to get the user data
    const user = await getUser(userId)
    console.log("User", user, userId)
    return(
        <div className="flex h-screen max-h-screen">
            <section className="remove-scrollbar container">
                <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
                    <Image 
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="mb-12 h-10 w-fit"
                    />
                    <RegisterForm user={user}/>

                    <p className="copyright py-12">
                        Copyright 2024
                    </p>
    
                </div>
            </section>

            <Image
                src="/assets/images/register-img.png"
                height={1000}
                width={1000}
                alt="doctor"
                className="side-img max-w-[390px]"
            />
        </div>
    );
}

export default Register;