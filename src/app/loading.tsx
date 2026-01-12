'use client';
import { Spinner, Title2 } from '@fluentui/react-components';
import { Providers } from './providers';

export default function Loading() {
  return (
    <Providers>
      <div style={{ maxWidth: '500px', margin: '60px auto', textAlign: 'center' }}>
        <Title2 block style={{ marginBottom: '20px' }}>Loading Tasks...</Title2>
        <Spinner size="huge" label="Connecting to MySQL..." />
      </div>
    </Providers>
  );
}