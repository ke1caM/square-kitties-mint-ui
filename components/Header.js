import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">Square Kitties</h1>
            <div>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
