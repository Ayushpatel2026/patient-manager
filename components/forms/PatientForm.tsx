"use client"
import React, { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { UserFormValidation } from "@/lib/validation"
import {useRouter} from "next/navigation"
import {createUser} from "@/lib/actions/patient.actions"
 
// The template for this code was taken from the shad-cn documentation on using React Hook Form with Zod.

// define an enum for all the different types of form fields to make code more readable
export enum FormFieldType{
	INPUT = 'input',
	TEXTAREA = 'textarea',
	CHECKBOX = 'checkbox',
	PHONE_INPUT = 'phoneInput',
	DATE_PICKER = 'datePicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

export default function PatientForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false)

  // Define the form 
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
			email: "",
			phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof UserFormValidation>) {
    setIsLoading(true)
		try{
			const userData = {
				name,
				email,
				phone
			};

			const user = await createUser(userData);
		

			if (user) {
				router.push(`/patients/${user.$id}/register`);
			}
		}
		catch(e){
			console.error(e)
		}
  }

	// the custom form field component is used to render different types of form fields
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi there</h1>
            <p className="text-dark-700">Schedule your first appointment</p>
        </section>
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="name"
        label="Name"
        placeholder="John Doe"
        iconSrc="/assets/icons/user.svg"
        iconAlt="user"
        />
        <CustomFormField 
        fieldType={FormFieldType.INPUT}
        control={form.control}
        name="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        iconSrc="/assets/icons/email.svg"
        iconAlt="email"
        />
        <CustomFormField 
        fieldType={FormFieldType.PHONE_INPUT}
        control={form.control}
        name="phone"
        label="Phone Number"
        placeholder="(555) 123-4567"
        />
        <SubmitButton isLoading={isLoading}>
						Get Started
				</SubmitButton>
      </form>
    </Form>
  )
}