# Simple Blockchain, Token And Defi Interaction API

## Cloning and Setup

### Prerequisites

Ensure you have the following installed:
- Node.js (v14 or higher)
- pnpm (v1 or higher)
- Git

### Clone the Repository

```bash
git clone https://github.com/mhmad-nr/uniplato-task-blockchain.git
cd backend
```

### Install Dependencies

```bash
pnpm install
```

### Setup Environment Variables

Create a `.env` file in the project root like `.example.env` and add the following environment variables:

```
SEPOLIA_RPC_URL=<Your_Sepolia_RPC_URL>
PRIVATE_KEY=<Your_Private_Key>
```

### Run the Application

```bash
pnpm run start:dev
```

### Running Tests

```bash
pnpm run test
```
### Setup Script

To simplify the setup process, you can use the `setup.sh` script. This script will install dependencies, compile TypeScript files, and notify you when the setup is complete.

#### Contents of `setup.sh`

```bash
#!/bin/bash

# Install dependencies using pnpm
pnpm install

# Additional setup commands
# Example: Compile TypeScript files
pnpm run build

# Notify the user that setup is complete
echo "Setup complete. Ensure you have created a .env file with the necessary environment variables."
```

To use the setup script, run the following command in the project root:

```bash
./setup.sh
```



## Project Structure

```
- src/
  - blockchain-interaction/
    - blockchain-interaction.controller.ts   # Controller for blockchain interaction endpoints
    - blockchain-interaction.module.ts       # Module definition for blockchain interaction
    - blockchain-interaction.service.ts      # Service handling blockchain interactions
    - dto/
      - address.dto.ts                       # Data Transfer Object for address
      - transaction.dto.ts                   # Data Transfer Object for transactions
      - value.dto.ts                         # Data Transfer Object for values
  - defi/
    - defi.controller.ts                     # Controller for DeFi related endpoints
    - defi.module.ts                         # Module definition for DeFi
    - defi.service.ts                        # Service handling DeFi interactions
    - dto/
      - pool.dto.ts                          # Data Transfer Object for pool creation and queries
  - token/
    - token.controller.ts                    # Controller for token-related endpoints
    - token.module.ts                        # Module definition for token management
    - token.service.ts                       # Service handling token operations
    - dto/
      - address.dto.ts                       # Data Transfer Object for address
      - mint.dto.ts                          # Data Transfer Object for minting tokens
      - value.dto.ts                         # Data Transfer Object for values
  - util/
    - contracts/
      - sepolia/
        - MyDeFi.json                        # ABI and address for MyDeFi contract on Sepolia
        - Uniswap.json                       # ABI and address for Uniswap contract on Sepolia
- test/
  - blockchain-interaction.controller.spec.ts  # Test suite for blockchain interaction controller
  - defi.controller.spec.ts                    # Test suite for DeFi controller
  - token.controller.spec.ts                   # Test suite for token controller
- .env                                       # Environment variable file
- package.json                               # Node.js dependencies and scripts
- tsconfig.json                              # TypeScript configuration
- README.md                                  # Project documentation
```

## Features

- **Blockchain Interaction**: Retrieve balance and transaction count, and send transactions.
- **DeFi Services**: Create liquidity pools, enable fee amounts, and retrieve tick spacing.
- **Token Management**: Get token balance, get ETH balance, and mint tokens.



## API Endpoints

### Blockchain Interaction

- **POST /blockchain-interaction/balance**: Get balance of an address
  - **Body**: `{ "address": "0x123..." }`
  - **Response**: `{ "value": "1000.0" }`

- **POST /blockchain-interaction/transaction-count**: Get transaction count of an address
  - **Body**: `{ "address": "0x123..." }`
  - **Response**: `{ "value": 5 }`

- **POST /blockchain-interaction/transaction**: Send a transaction
  - **Body**: `{ "from": "0x123...", "to": "0xabc...", "amount": 0.1, "privateKey": "your-private-key" }`
  - **Response**: `{ "value": "transaction-hash" }`

### Token Management

- **POST /token/token-balance**: Get token balance of an address
  - **Body**: `{ "address": "0x123...", "privateKey": "your-private-key" }`
  - **Response**: `"1000.0"`

- **POST /token/eth-balance**: Get ETH balance of an address
  - **Body**: `{ "address": "0x123...", "privateKey": "your-private-key" }`
  - **Response**: `"500.0"`

- **POST /token/mint**: Mint tokens
  - **Body**: `{ "amount": 100, "privateKey": "your-private-key" }`
  - **Response**: `{ "value": "transaction-hash" }`

### DeFi Services

- **GET /defi/factory-owner**: Get factory owner
  - **Response**: `"0xowneraddress"`

- **GET /defi/enable-fee-amount/:fee/:tickspacing**: Enable fee amount
  - **Params**: `fee`, `tickspacing`
  - **Response**: `{ "value": "transaction-hash" }`

- **GET /defi/tick-spacing/:fee**: Get tick spacing for a fee
  - **Params**: `fee`
  - **Response**: `10`

- **POST /defi/create-pool**: Create a new liquidity pool
  - **Body**: `{ "tokenA": "0x123...", "tokenB": "0xabc...", "fee": 500 }`
  - **Response**: `"transaction-hash"`

- **POST /defi/pool-address**: Get pool address
  - **Body**: `{ "tokenA": "0x123...", "tokenB": "0xabc...", "fee": 500 }`
  - **Response**: `"0xpooladdress"`


