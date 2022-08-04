import { useWeb3Contract, useMoralis } from "react-moralis"
import { abi } from "../constants"
import { Button, Information, Loading, useNotification, CryptoLogos, Input } from "web3uikit"
import { useState, useEffect } from "react"
import { ethers } from "ethers"
import Link from "next/link"

export default function Mint() {
    const contractAddress = "0x607B256d92A3932C737527Be16462e4FCaf958c7"
    const { isWeb3Enabled, chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const cost = ethers.utils.parseEther("15")

    const dispatch = useNotification()

    // useState Hooks //

    const [totalSupplyNumber, setTotalSupplyNumber] = useState(0)
    const [amountOfNft, setAmountOfNft] = useState(0)

    // Contract Non-View Functions //

    const {
        isLoading,
        isFetching,
        runContractFunction: mint,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "mint",
        params: { _mintAmount: amountOfNft },
        msgValue: cost * amountOfNft,
    })

    // Contract View Functions

    const { runContractFunction: totalSupply } = useWeb3Contract({
        abi: abi,
        contractAddress: contractAddress,
        functionName: "totalSupply",
        params: {},
    })

    // Notification Functions //

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Completed!",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        })
    }

    // Update UI Functions //

    async function updateUIValues() {
        const totalSupplyFromCall = await totalSupply()
        setTotalSupplyNumber(totalSupplyFromCall)
    }

    // useEffect Hooks //

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUIValues()
        }
    }, [isWeb3Enabled, totalSupplyNumber])

    return (
        <div className="p-5">
            {chainId == 137 ? (
                <div>
                    <div className="pt-5 pb-5 flex justify-center">
                        <h1 className="text-3xl font-medium">{`Total supply ${totalSupplyNumber}/1000`}</h1>
                    </div>
                    <div className="pt-5 pb-5 flex justify-center">
                        <Link href="https://polygonscan.com/address/0x607B256d92A3932C737527Be16462e4FCaf958c7">
                            <a className="text-xl font-medium">0x607B...f958c7</a>
                        </Link>
                    </div>
                    <div className="flex justify-center">
                        <img src="websiteGif.gif" />
                    </div>
                    <div className="font-bold pt-5 flex justify-center">
                        You can mint up to 10 NFTs in one transaction
                    </div>
                    <div className="pt-5 flex justify-center">
                        <Input
                            label="NFT Amount"
                            name="NFT Amount"
                            type="number"
                            validation={{
                                numberMax: 10,
                                numberMin: 1,
                            }}
                            onChange={(event) => {
                                setAmountOfNft(event.target.value)
                            }}
                        ></Input>
                    </div>
                    <div className="pt-5 flex justify-center">
                        <Button
                            onClick={async () =>
                                await mint({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }
                            text={
                                isLoading || isFetching ? (
                                    <div
                                        style={{
                                            backgroundColor: "#ECECFE",
                                            borderRadius: "8px",
                                            padding: "20px",
                                        }}
                                    >
                                        <Loading
                                            size={12}
                                            spinnerColor="#2E7DAF"
                                            spinnerType="wave"
                                        />
                                    </div>
                                ) : (
                                    <div>Mint</div>
                                )
                            }
                            theme="outline"
                            disabled={isLoading || isFetching}
                        />
                    </div>
                    <div className="text-3xl font-bold pt-5 pb-5 flex justify-center">
                        PRICE FOR ONE NFT:
                    </div>
                    <div className="text-xl font-bold pb-5 flex justify-center">15 MATIC</div>
                    <div className="pb-5 flex justify-center">
                        <CryptoLogos chain="polygon" size="48px" />
                    </div>
                    <div className="font-bold pb-5 flex justify-center">WARNING!</div>
                    <div className="font-bold pb-5 flex justify-center">
                        Make sure you are on correct network (Polygon Mainnet)!
                    </div>
                    <div className="font-bold pb-5 flex justify-center">
                        Once the purchase is made, this cannot be undone!
                    </div>
                </div>
            ) : (
                <div>
                    <Information
                        information="Please Connect to Polygon Main Network"
                        topic="No Address Detected"
                    />
                </div>
            )}
        </div>
    )
}
