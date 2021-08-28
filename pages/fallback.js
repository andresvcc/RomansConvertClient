import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { redux } from 'components';

export default function Home() {
  const [stateRedux, dispatch] = redux();

  return (
    <div>
      <main>
        <h1>This is offline fallback page</h1>
        <h2>When offline, any route will fallback to this page</h2>
      </main>

      <footer>
        <h6>Footer</h6>
      </footer>
    </div>
  );
}
