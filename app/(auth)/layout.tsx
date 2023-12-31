export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className="flex-center min-h-screen w-full bg-primary-50 bg-cover bg-fixed bg-center bg-dotted-pattern">
            {children}
        </main>
    )
}
