// We are going to skimp a bit on these tests...

import { assert, expect } from "chai"
import { network, deployments, ethers } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import { BasicNft } from "../../typechain-types"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Basic NFT Unit Tests", function () {
          let basicNft: BasicNft
          let deployer

          beforeEach(async () => {
              const accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["mocks", "basicnft"])
              basicNft = await ethers.getContract("BasicNft")
          })

          it("Allows users to mint an NFT, and updates appropriately", async function () {
              const txResponse = await basicNft.mintNft()
              await txResponse.wait(1)
              const tokenURI = await basicNft.tokenURI(0)
              const tokenCounter = await basicNft.getTokenCounter()

              assert.equal(tokenCounter.toString(), "1")
              assert.equal(tokenURI, await basicNft.TOKEN_URI())
          })
      })

//by chatgpt
// import { ethers } from "hardhat"
// import { expect } from "chai"

// describe("BasicNft contract", function () {
//     let basicNft: any

//     beforeEach(async function () {
//         const BasicNft = await ethers.getContractFactory("BasicNft")
//         basicNft = await BasicNft.deploy()
//         await basicNft.deployed()
//     })

//     it("should deploy correctly", async function () {
//         expect(basicNft.address).to.not.equal(0)
//     })

//     it("should return the correct token URI", async function () {
//         const tokenUri = await basicNft.tokenURI(0)
//         expect(tokenUri).to.equal(
//             "ipfs://bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json"
//         )
//     })

//     it("should increment the token counter when minting an NFT", async function () {
//         const tokenCounterBefore = await basicNft.getTokenCounter()
//         await basicNft.mintNft()
//         const tokenCounterAfter = await basicNft.getTokenCounter()
//         expect(tokenCounterAfter).to.equal(tokenCounterBefore + 1)
//     })

//     it("should assign the NFT to the caller when minting an NFT", async function () {
//         const [owner] = await ethers.getSigners()
//         await basicNft.mintNft()
//         const tokenOwner = await basicNft.ownerOf(0)
//         expect(tokenOwner).to.equal(owner.address)
//     })
// })
