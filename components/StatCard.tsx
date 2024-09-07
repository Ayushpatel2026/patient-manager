import clsx from 'clsx';
import React from 'react';
import Image from 'next/image';

interface StatCardProps {
  count: number;
  label: string;
  icon: string;
  type: 'appointments' | 'pending' | 'cancelled';
}

const StatCard = ({count = 0, label, icon, type} : StatCardProps) => {
  // clsx is a utility for conditionally joining class names together depending dynamic values in our application
  return (
    <div className={clsx('stat-card', {
        'bg-appointments': type === 'appointments',
        'bg-pending': type === 'pending',
        'bg-cancelled': type === 'cancelled',
      })}>
        <div className="flex items-center gap-4">
          <Image
            src={icon}
            alt={label}
            width={32}
            height={32}
          />
          <h2 className="text-32-bold text-white">
            {count}
          </h2>
        </div>
        <p className="text-14-regular">
          {label}
        </p>
    </div>
  );
}

export default StatCard;