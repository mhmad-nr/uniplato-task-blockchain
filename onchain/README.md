# MyDeFi

## Description

MyDeFi is a decentralized finance (DeFi) smart contract that implements a simple ERC-20 token with additional functionalities. This project allows users to mint new tokens either by directly paying with Ether or by using their deposited balance. The contract is deployed on the Sepolia testnet.

## Features

- **Mint Tokens**: Users can mint new tokens by paying the required amount of Ether.
- **Mint with Deposit**: Users can also mint tokens using their pre-deposited balance.
- **Deposit**: Users can deposit Ether to be used for minting tokens in the future.
- **View Balance**: Users can view their deposited balance.

## Contract Deployment

The MyDeFi contract is deployed on the Sepolia testnet at the following address:
`0xD00BC9978f40c07bFc22288b59FCAADE949Cc4B5`

## Setup

### Prerequisites

- Node.js (v14 or later)
- pnpm (v9 or later)
- Hardhat

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mhmad-nr/uniplato-task-blockchain.git
   cd onchain
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add your environment variables. You can use the `.env.example` file as a template.

   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your own values, especially the `ETHERSCAN_API_KEY` and `PRIVATE_KEY` for deployment.

### Deployment

To deploy the MyDeFi contract to the Sepolia testnet, use the following command:

```bash
pnpm hardhat deploy deploy/01_Deploy_MyDeFi.ts --network sepolia
```

### Verification

If you want to verify the contract on Etherscan, make sure you have set the `ETHERSCAN_API_KEY` in your `.env` file and then run:

```bash
pnpm hardhat verify --network sepolia <DEPLOYED_CONTRACT_ADDRESS>
```

### Running Tests

To run the test suite, use the following command:

```bash
pnpm hardhat test ./test/unit/MyDeFi.test.ts
```

The test suite covers all major functionalities, ensuring the contract behaves as expected.

### Usage

Here are some example commands to interact with the contract:

1. **Deposit Ether:**

   ```js
   await myDeFi.diposit({ value: ethers.parseUnits("1", "gwei") });
   ```

2. **Mint Tokens with Ether:**

   ```js
   await myDeFi.mint(10, { value: ethers.parseUnits("10", "gwei") });
   ```

3. **Mint Tokens with Deposited Balance:**

   ```js
   await myDeFi.mintDiposit(10);
   ```

4. **Get Deposited Balance:**

   ```js
   const balance = await myDeFi.getBalance();
   console.log(balance.toString());
   ```

## Project Structure

```
- contracts/
  - MyDeFi.sol       # Main smart contract
- scripts/
  - deploy.ts        # Deployment script
- test/
  - MyDeFi.test.ts   # Test suite
- .env.example       # Environment variable example file
- hardhat.config.ts  # Hardhat configuration
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

