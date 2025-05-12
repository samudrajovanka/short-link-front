import '@/assets/styles/globals.css';
import inter from '@/assets/fonts/inter';
import Providers from '@/components/parts/Providers';
import generateMetadata from '@/lib/metadata';

export const metadata = generateMetadata();

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={`${inter.variable} container bg-gray-50`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
