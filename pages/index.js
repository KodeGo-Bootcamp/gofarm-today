import Head from 'next/head'
import NavigationBar from '@/components/NavigationBar'
import ChatFrame from '@/components/ChatFrame'
import DraftFrame from '@/components/DraftFrame'
import WeatherFrame from '@/components/WeatherFrame'

export default function Home() {
    return (
        <>
            <Head>
                <title>Go Farm Today</title>
                <meta name="description" content="Transform farming with Go Farm Today. 
                    Our app provides area calculations, resource use, weather, 
                    crop prices, and soil fertility for increased profits." />
                <meta property="og:title" content="Go Farm Today" />
                <meta property="og:description" content="Transform farming with Go Farm Today. 
                    Our app provides area calculations, resource use, weather, 
                    crop prices, and soil fertility for increased profits." />
                <meta property="og:url" content="https://gofarm.today" />
                <meta property="og:image" content="https://gofarm.today/cover-gofarm.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <NavigationBar activeKey={"/"} />
            <WeatherFrame />
            <ChatFrame />
            <DraftFrame />
        </>
    )
}
