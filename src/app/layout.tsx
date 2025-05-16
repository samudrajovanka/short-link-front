import '@/assets/styles/globals.css';
import inter from '@/assets/fonts/inter';
import Providers from '@/components/parts/Providers';
import { Toaster } from '@/components/ui/sonner';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.variable} container bg-gray-50 h-dvh`}>
        <Providers>
          {children}

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
