import { Container, Nav, Navbar } from "react-bootstrap"
import Image from "next/image"

export default function NavigationBar({ activeKey }) {
    const getLink = (href) => {
        return activeKey == href ? "#top" : href
    }

    const isCurrentLink = (href) => {
        return activeKey == href
    }

    const LogoShownOnMobile = () => {
        return (
            <Navbar className={"d-md-none p-3 pb-0"} bg={"light"}>
                <Container className="justify-content-center">
                    <Navbar.Brand className={"m-0 p-0 pt-3"} href={getLink("/")} aria-label={"home"}>
                        <Image src={"/cover-gofarm.svg"} width={104 * 1.3 * 2} height={30.9971127298 * 1.3 * 2} alt={"go farm cover"} loading={"eager"} />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        )
    }

    const NavigationLinks = () => {
        return (
            <Navbar className={"p-3"} sticky={"top"} bg={"light"}>
                <Container className={"justify-content-center justify-content-md-start"}>
                    <Navbar.Brand className={"d-none d-md-inline p-0"} href={getLink("/")} aria-label={"home"}>
                        <Image src={"/logo-gofarm.svg"} width={30.9971127298 * 1.3} height={30.9971127298 * 1.3} alt={"go farm logo"} />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link active={isCurrentLink("/")} href={getLink("/")}>
                            Home
                        </Nav.Link>
                        <Nav.Link active={isCurrentLink("/about")} href={getLink("/about")}>
                            About
                        </Nav.Link>
                        <Nav.Link active={isCurrentLink("/contact")} href={getLink("/contact")}>
                            Contact
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    }


    return (
        <>
            <LogoShownOnMobile />
            <NavigationLinks />
        </>
    )
}
