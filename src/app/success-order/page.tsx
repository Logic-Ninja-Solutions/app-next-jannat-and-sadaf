'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

function Page() {
  return (
    <div className="flex justify-center text-center mt-20">
      <div>
        <h2 className="text-2xl font-bold mb-4">Thank you for ordering</h2>
        <p className="text-gray-600 mb-6">For a better experience</p>
        <Button color="secondary" href='/login' as={Link}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Page;
