import Head from 'next/head'
import NavigationBar from '@/components/NavigationBar'
import DraftFrame from '@/components/DraftFrame'
import ContactForm from '@/components/ContactForm'
export default function Contact() {
    return (
        <>
            <Head>
                <title>Contact | Go Farm Today</title>
                <meta name="description" content="Connect with gofarm.today for innovative farming solutions. 
                    Our team of experts helps you leverage our app to increase your efficiency and profitability." />
                <meta property="og:title" content="Contact | Go Farm Today" />
                <meta property="og:description" content="Connect with gofarm.today for innovative farming solutions. 
                    Our team of experts helps you leverage our app to increase your efficiency and profitability." />
                <meta property="og:url" content="https://gofarm.today/contact" />
                <meta property="og:image" content="https://gofarm.today/cover-gofarm.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavigationBar activeKey={"/contact"} />
            <ContactForm />
        </>
    )
}
