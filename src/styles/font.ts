import { Montserrat } from 'next/font/google';

// export const fontPoppins = Poppins({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-poppins',
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// });

// export const fontBellezza = Belleza({
//   subsets: ['latin'],
//   display: 'swap',
//   variable: '--font-belleza',
//   style: 'normal',
//   weight: '400',
// });

// export const fontSans = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// });

export const fontMontserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const font = fontMontserrat;
export const fontStyle = font.style.fontFamily;
export const fontClass = font.className;
