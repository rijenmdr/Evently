import Image from "next/image"
import Link from "next/link"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

import NavItems from "./NavItems"
import MobileNav from "./MobileNav"
import { Button } from "../ui/button"

const Header = () => {
    return (
        <header className="w-full border-b">
            <div className="wrapper flex justify-between items-center">
                <Link href={"/"} className="w-36">
                    <Image
                        src={"/assets/images/logo.svg"}
                        alt="Logo"
                        width={128}
                        height={38}
                    />
                </Link>

                <nav className="md:flex-between hidden w-full max-w-xs">
                    <NavItems />
                </nav>

                <div className="flex justify-end w-32 gap-3">
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                        <MobileNav/>
                    </SignedIn>

                    <SignedOut>
                        <Button asChild size="lg" className="rounded-full">
                            <Link href={"/login"}>
                                Login
                            </Link>
                        </Button>
                    </SignedOut>
                </div>
            </div>
        </header>
    )
}

export default Header