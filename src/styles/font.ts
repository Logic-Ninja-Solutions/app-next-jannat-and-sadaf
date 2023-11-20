import { Poppins } from 'next/font/google';

export const font = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const fontStyle = font.style.fontFamily;
export const fontClass = font.className;
