'use client';

// import { useEffect } from 'react';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Error',
  description: 'Unexpected error',
};

type ErrorProps = {
  error?: Error,
  reset: () => void
}

// useEffect(() => {
//   // Log the error to an error reporting service
//   console.error(error);
// }, [error]);

const Error = ({ reset }: ErrorProps) => (
  <div>
    <h2>Something went wrong!</h2>
    <button
      onClick={
        // Attempt to recover by trying to re-render the segment
        () => reset()
      }
    >
        Try again
    </button>
  </div>
);

export default Error;
