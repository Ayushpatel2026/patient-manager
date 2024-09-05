import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAppointment } from "@/lib/actions/appointment.actions";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// the url for this page will be https://localhost:3000/patients/[userId]/new-appointment/success?appointmentId=[appointmentId]
// we can use this url to get both the userId and the appointmentId
const Success = async ({params : {userId}, searchParams} : SearchParamProps) => {
    const appointmentId = (searchParams?.appointmentId as string) || '';
    const appointment = await getAppointment(appointmentId);

    // TODO - the doctors are currently stored in constants, but should be stored in the database
    const doctor = Doctors.find(doctor => doctor.name === appointment?.primaryPhysician);
    return (
        <div className="flex h-screen max-h-screen px-[5%]">
            <div className="success-img">
                <Link href="/">
                    <Image
                        src="/assets/icons/logo-full.svg"
                        height={1000}
                        width={1000}
                        alt="logo"
                        className="h-10 w-fit"
                    />
                </Link>
                <section className="flex flex-col items-center">
                    <Image
                        src="/assets/gifs/success.gif"
                        height={300}
                        width={300}
                        alt="success"
                    />
                    <h2 className="header mb-6 max-w-[600px] text-center">
                        Your <span className="text-green-500">appointment request</span> has been successfully submitted.
                    </h2>
                    <p>
                        We will get back to you shortly.
                    </p>
                </section>

                <section className="request-details">
                    <p>Requested appointment details:</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={doctor?.image!}
                            alt="doctor"
                            width={100}
                            height={100}
                            className="size-6"

                        />
                        <p className="whitespace-nowrap">
                            Dr. {doctor?.name}
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Image
                            src="/assets/icons/calendar.svg"
                            alt="calendar"
                            width={24}
                            height={24}
                        />
                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>
                {/* The asChild allows the button to renders as a Link but contains the styling and functionality of the button */}
                <Button variant="outline" className="shad-primary-btn" asChild> 
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointment
                    </Link>
                </Button>
                <p className="copyright">
                    Copyright 2024
                </p>

            </div>
        </div>
    )
}

export default Success;