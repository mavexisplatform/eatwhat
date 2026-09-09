export const metadata = {title: 'EatWhat'}
export default function RootLayout({children}: {children: React.ReactNode}) {
  return <html lang="vi"><body style={{margin:0,fontFamily:'sans-serif'}}>{children}</body></html>
}