import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import Mint from "../components/Mint"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Mint Square Kitties</title>
                <meta name="description" content="Square Kitties Minting Dapp" />
                <link rel="icon" href="/photo.png" />
            </Head>
            <Header />
            <Mint />
        </div>
    )
}
