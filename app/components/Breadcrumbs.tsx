'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const steps = [
    { name: 'Start', href: '/' },
    { name: 'Duration', href: '/parking' },
    { name: 'Vehicle', href: '/vehicle' },
    { name: 'Payment', href: '/payment' },
    { name: 'Thank you', href: '/thank-you' },
];

export function Breadcrumbs() {
    const pathname = usePathname();

    return (
        <div className="text-sm text-gray-600 mb-4 flex flex-wrap items-center gap-1">
            {steps.map((step, idx) => {
                const isActive = pathname === step.href;
                return (
                    <span key={step.href} className="flex items-center gap-1">
                        <Link
                            href={step.href}
                            className={`hover:underline ${isActive ? 'font-semibold text-black' : ''}`}
                        >
                            {step.name}
                        </Link>
                        {idx < steps.length - 1 && <span>&gt;</span>}
                    </span>
                );
            })}
        </div>
    );
}
