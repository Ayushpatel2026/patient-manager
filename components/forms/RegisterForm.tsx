"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { PatientFormValidation } from "@/lib/validation";

import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";
import {FormFieldType} from "./PatientForm";
import CustomFormField from "../CustomFormField";
import FileUploader from "../FileUploader";
import SubmitButton from "../SubmitButton";


export default function RegisterForm({user} : {user: User}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false)

  // Define the form 
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
			email: "",
			phone: "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    console.log("submitting")
    setIsLoading(true)

    let formData;

    // Check if the identification document is present and append it to the form data
    if (values.identificationDocument && values.identificationDocument.length > 0) {
      // blobFile is created to store the file data, a blob is a file-like object of immutable, raw data
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type
      });
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
		try{
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData
      }

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient){
        router.push(`/patients/${user.$id}/new-appointment`)
      }
    }catch(error){
      console.log(error)
    }
    setIsLoading(false)
  }

	// the custom form field component is used to render different types of form fields
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div>
        </section>
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
          label="Full Name"
        />
        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField 
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of Birth"
            />
            <CustomFormField 
              fieldType={FormFieldType.SKELETON}
              control={form.control}
              name="gender"
              label="Gender"
              renderSkeleton={(field) => (
                  <FormControl>
                      <RadioGroup className="gap-6 flex h-11 xl:justify-between"
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                      >
                          {GenderOptions.map((option) =>{
                              return <div key={option} className="radio-group">
                                  <RadioGroupItem value={option} id={option}/>
                                  <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                              </div>
                          })}
                      </RadioGroup>   
                  </FormControl>
              )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            placeholder="14th Street, New York"
          />
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            placeholder="Software Engineer"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Guardian Name"
          />
          <CustomFormField 
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="(555) 123-4567"
          />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>     

        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="primaryPhysician"
            label="Primary Physician"
            placeholder="Select a Physician">
              {Doctors.map((doctor) => (
                <SelectItem key={doctor.name} value={doctor.name}>
                  <div className="flex items-center cursor-pointer gap-2">
                    <Image src={doctor.image} alt={doctor.name} width={32} height={32} className="rounded-full border border-dark-500" />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Blue Cross Blue Shield"
          />
          <CustomFormField 
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="123456789"
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Pollen, etc."
          />
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication (if any)"
            placeholder="Ibuprofen, 200mg, Paracetamol, 500mg, etc."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="Mother - Diabetes, Father - Hypertension, etc."
          />
          <CustomFormField 
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Appendectomy - 2010, etc."
          />
        </div>
        
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identification and Verification</h2>
            </div>
        </section> 
        
        <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="identificationType"
            label="Identification Type"
            placeholder="Select an identification type">
              {IdentificationTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
        </CustomFormField>
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="123456789"
        />
        <CustomFormField 
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of identification document"
          renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange}/>
              </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section> 

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to receive treatment for my health condition"
        />

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="discolsureConsent"
          label="I consent to the use and disclosure of my health information for treatment, payment, and healthcare operations"
        />

        <CustomFormField 
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I have read and agree to the privacy policy"
        />
        <SubmitButton isLoading={isLoading}>
						Submit and Continue
				</SubmitButton>
      </form>
    </Form>
  )
}

