"use client"

import { ColumnDef } from "@tanstack/react-table"
import StatusBadge from "../StatusBadge"
import { formatDateTime } from "@/lib/utils"
import { Doctors } from "@/constants"
import Image from "next/image"
import AppointmentModal from "../AppointmentModal"
import { Appointment } from "@/types/appwrite.types"

// most of the code for the columns is taken from the shad-cn documentation on how to use the table component

export const columns: ColumnDef<Appointment>[] = [
    {
        header: "ID",
        cell: ({ row }) => {
          return <p className="text-14-medium">{row.index + 1}</p>
        },
    },
    {
        accessorKey: 'patient',
        header: 'Patient',
        cell: ({ row }) => {
          const appointment = row.original
          return <p className="text-14-medium">{appointment.patient.name}</p>
        }
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            return (
                <div className="min-w-[115px]">
                    <StatusBadge status={row.original.status} />
                </div>
            );
        }
    },
    {
        accessorKey: "schedule",
        header: "Appointment",
        cell: ({ row }) => {
          const appointment = row.original
          return (
            <p className="text-14-regular min-w-[100px]">
              {formatDateTime(appointment.schedule).dateTime}
            </p>
          )
        }
    },
    {
        accessorKey: "primaryPhysician",
        header: () => 'Doctor',
        cell: ({ row }) => {
          const doctor = Doctors.find(doctor => doctor.name === row.original.primaryPhysician)
     
          return (
            <div className="flex items-center gap-3">
                <Image
                    src={doctor?.image!}
                    alt={doctor?.name!}
                    width={100}
                    height={100}
                    className="size-8"
                />
                <p className="whitespace-nowrap">
                    Dr. {doctor?.name}
                </p>
            </div>  
        )},
      },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
          return(
            <div className="flex gap-1">
                <AppointmentModal type="schedule"
                    patientId={row.original.patient.$id}
                    userId={row.original.userId}
                    appointment={row.original}
                    title="Schedule Appointment"
                    description="Please confirm the following details to schedule an appointment"
                />
                <AppointmentModal type="cancel"
                    patientId={row.original.patient.$id}
                    userId={row.original.userId}
                    appointment={row.original}
                    title="Cancel Appointment"
                    description="Are you sure you want to cancel this appointment?"
                />
            </div>
          )
        },
  },
]
