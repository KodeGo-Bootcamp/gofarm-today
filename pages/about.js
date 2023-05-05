import Head from 'next/head'
import NavigationBar from '@/components/NavigationBar'
//import DraftFrame from '@/components/DraftFrame'
import AboutChatFrame from '@/components/AboutChatFrame'
import Aboutsensor from '@/components/AboutSensorFrame'
import AboutWeatherFrame from '@/components/AboutWeatherFrame'
import Instruction from '@/components/AboutInstructions'

export default function About() {
    return (
        <>
            <Head>
                <title>About | Go Farm Today</title>
                <meta name="description" content="Revolutionize modern agriculture with Go Farm Today. 
                    Get comprehensive farming recommendations, predictions, and maximize your yield potential." />
                <meta property="og:title" content="About | Go Farm Today" />
                <meta property="og:description" content="Revolutionize modern agriculture with Go Farm Today. 
                    Get comprehensive farming recommendations, predictions, and maximize your yield potential." />
                <meta property="og:url" content="https://gofarm.today/about" />
                <meta property="og:image" content="https://gofarm.today/cover-gofarm.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavigationBar activeKey={"/about"} />
            <Aboutsensor/>
            <AboutWeatherFrame/>
            <AboutChatFrame/>
            <Instruction/>
        </>
    )
}
