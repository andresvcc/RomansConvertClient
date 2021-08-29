import React, { useEffect, useState } from 'react';

export default function Home() {
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
