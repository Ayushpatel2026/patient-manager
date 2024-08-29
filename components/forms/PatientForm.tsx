"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomFormField from "../CustomFormField"
 
// The template for this code was taken from the shad-cn documentation on using React Hook Form with Zod.

/*
    Zod is used to define the schema of the form and validate the form data types.
*/
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
	email: z.string().email({
			message: "Please enter a valid email address.",
	}),
	phone: z.string().min(10, {
			message: "Please enter a valid phone number.",
	}),
})
 
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
  // Define the form 
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
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
        name="username"
        label="Username"
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}