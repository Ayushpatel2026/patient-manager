import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';
import { StatusIcon } from '@/constants';

const StatusBadge = ({status}: {status : Status}) => {
    return (
        <div className={clsx('status-badge', {
            'bg-green-100 text-green-700': status === 'scheduled',
            'bg-red-100 text-red-700': status === 'cancelled',
            'bg-blue-100 text-yellow-700': status === 'pending',
        })}>
            <Image
                src={StatusIcon[status]}
                alt={status}
                width={24}
                height={24}
                className="h-fit w-3"
            />
            <p className={clsx('text-12-semibold capitalize', 
                {
                    'text-green-500': status === 'scheduled',
                    'text-red-500': status === 'cancelled',
                    'text-blue-500': status === 'pending',
                })}>
                {status}
            </p>
        </div>
    );
}

export default StatusBadge;