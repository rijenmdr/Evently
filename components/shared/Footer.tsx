import Image from "next/image"
import Link from "next/link"

const Footer = () => {
    return (
        <footer className="w-full border-t">
            <div className="wrapper flex-between text-center gap-4 md:flex-row flex-col">
                <Link href='/'>
                    <Image
                        src="/assets/images/logo.svg"
                        alt="logo"
                        width={128}
                        height={38}
                    />
                </Link>

                <p>2023 Evently. All Rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer