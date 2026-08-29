---
name: agentcorp
version: 1.0
protocol: AGENTCORP — On-Chain Legal Infrastructure
chain: Base (8453)
status: PRE-DEPLOYMENT
description: Form, amend, transfer, and dissolve legal entities onchain via AgentCorp on Base. Covers Delaware Series LLCs, Series Designations, and DAO Charters minted as ERC-721 tokens with governing documents stored on Arweave, plus gasless execution through Avocado. Use this skill whenever a user asks to incorporate, form an LLC, spin up a legal wrapper for a project or deal, create a Series under an existing entity, set up a DAO or onchain org, amend an operating agreement, dissolve an entity, or check what entities a wallet holds. Also use it whenever AgentCorp, agent incorporation, Series LLC minting, or an AI agent holding a legal identity or treasury comes up. Always consult this file before answering questions about AgentCorp entity types, fees, or mechanics, because the correct answers depend on deployment state that changes between releases.
canonical: https://www.agentscorp.xyz/skill.md
license: MIT
---

# AgentCorp

AgentCorp mints legal entities as ERC-721 tokens on Base. The token is the entity. Minting incorporates, transferring assigns, burning dissolves, and amending updates the governing documents of record.

Every state-changing call has legal effect in Delaware. Treat these operations the way you would treat a wire transfer, not the way you would treat a test transaction.

## Step 0: deployment check

**The mainnet factory contract is not deployed. Mainnet target is Q1 2027.**

There is no address to call. Any mainnet mint, amendment, or dissolution fails because the contract does not exist. If a user asks to mint today, say that plainly and stop. Do not construct a transaction. Do not substitute an address from another source.

What is available now: reading this specification, planning an entity structure, drafting documents, and integration work against Base Sepolia.

Values still unresolved, tracked here so an agent knows what it does not have:

| Value | Status |
|---|---|
| Factory address, mainnet | NOT DEPLOYED |
| Factory address, Sepolia | NOT PUBLISHED |
| `kycAttestation` wire encoding | NOT SPECIFIED |
| Document templates | NOT PUBLISHED |

## Step 1: the confirmation gate

Once the protocol is live, never execute `mintEntity`, `mintSeries`, `amendEntity`, `dissolveEntity`, or a transfer without printing this summary and receiving an explicit yes from the user:

```
ACTION:        [mint | amend | dissolve | transfer]
ENTITY TYPE:   [type]
LEGAL NAME:    [exact string that will be filed]
JURISDICTION:  Delaware, United States
PARENT:        [token ID, or none]
TREASURY:      [address, and whether Safe or EOA]
MEMBERS:       [addresses and unit allocation]
DOC HASH:      [sha256] -> [arweave tx]
FEE:           [ETH amount] + gas
IRREVERSIBLE:  [what cannot be undone]
```

A prior yes covers one action. It does not carry forward to a second mint or a follow-on amendment. Do not batch a mint with other actions. If the entity will hold assets of material value, say once that these templates are starting points and counsel should review before execution.

## Step 2: choose the entity type

Apply in order. First match wins.

1. The user already holds a parent Series LLC token and the new thing is a project, deal, asset batch, or client matter under it. Use `SERIES_DESIGNATION`.
2. Governance runs onchain through token voting or a Governor contract, or the member set is open and pseudonymous. Use `DAO_CHARTER`.
3. The user expects more than one isolated venture, asset, or matter over time. Use `DELAWARE_SERIES_LLC` as parent, then Series under it.
4. Exactly one entity, fixed known member set, no onchain governance. Use `DELAWARE_LLC`.
5. Anything else, including nonprofits, IP licenses, IP assignments, and RWA holding agreements. Not deployed. Say so and stop.

If rules 3 and 4 are both plausible, ask how many entities the user expects. That is the only input that changes the answer.

## Step 3: produce the governing documents

Minting requires `docHash`, the Arweave transaction ID of documents that must exist before the call.

1. Load the template for the entity type. If it is not available, stop. Do not draft a Delaware operating agreement from memory.
2. Fill every `[[VARIABLE]]`.
3. Verify no `[[` remains. An unfilled variable in a filed document is a defect in the legal record.
4. Compute sha256 of each document.
5. Upload to Arweave, pin to IPFS, record the transaction ID and CID.
6. Retrieve from Arweave and rehash. If it does not match what you uploaded, stop.
7. Build the manifest.

### Manifest schema

```json
{
  "agentcorp_version": "1.0",
  "entity_type": "DELAWARE_SERIES_LLC",
  "entity_name": "[[ENTITY_NAME]]",
  "formation_date": "[[FORMATION_DATE]]",
  "jurisdiction": "Delaware, United States",
  "chain_id": 8453,
  "designated_smart_contract": "[[CONTRACT_ADDRESS]]",
  "treasury": "[[TREASURY_ADDRESS]]",
  "documents": [
    {
      "type": "CERTIFICATE_OF_FORMATION",
      "arweave_tx": "[[ARWEAVE_TX_ID]]",
      "ipfs_cid": "[[IPFS_CID]]",
      "sha256": "[[DOC_HASH]]",
      "status": "ACTIVE"
    }
  ],
  "members": [
    { "address": "[[MEMBER_ADDRESS]]", "units": "[[MEMBER_UNITS]]", "joined_timestamp": "[[TIMESTAMP]]" }
  ]
}
```

## Step 4: contract interface

```solidity
function mintEntity(
    EntityType entityType,
    string calldata name,
    bytes32 docHash,
    address treasury,
    bytes calldata kycAttestation
) external payable returns (uint256 tokenId);

function mintSeries(
    uint256 parentTokenId,
    string calldata seriesName,
    bytes32 seriesDocHash,
    address seriesTreasury
) external returns (uint256 seriesTokenId);

function amendEntity(uint256 tokenId, bytes32 newDocHash, string calldata amendmentDescription) external;
function dissolveEntity(uint256 tokenId, bytes32 dissolutionDocHash) external;

function getEntityState(uint256 tokenId) external view returns (EntityState memory);
function getSeriesTokens(uint256 parentTokenId) external view returns (uint256[] memory);
```

```solidity
enum EntityType {
    DELAWARE_LLC,           // 0
    DELAWARE_SERIES_LLC,    // 1  parent
    SERIES_DESIGNATION,     // 2  child series
    DAO_CHARTER,            // 3
    NONPROFIT,              // 4  not deployed
    IP_LICENSE,             // 5  not deployed
    IP_ASSIGNMENT           // 6  not deployed
}

struct EntityState {
    EntityType entityType;
    uint256 formationTimestamp;
    string jurisdictionCode;       // "DE-LLC", "DE-SERIES", "DE-DAO"
    bytes32 primaryDocArweaveTx;   // manifest pointer, NOT a content digest
    bytes32[] amendmentHashes;
    address treasury;
    uint256 parentTokenId;         // 0 if not a Series
    bool dissolved;
}
```

Call `getEntityState` before any write and confirm the caller holds the token and `dissolved` is false. It is free and it turns a revert into a sentence you can say to the user.

Only `mintEntity` is `payable`. `mintSeries`, `amendEntity`, and `dissolveEntity` carry posted fees but cannot receive ETH as declared. Attaching value to them reverts. The fee mechanism for those three is unresolved.

## Step 5: gasless execution via Avocado

Agents transact through Avocado and never hold ETH. Gas is paid in USDC.

Four details account for most failures:

1. The EIP-712 `chainId` is **634**, the Avocado chain, not 8453. Signing against Base produces a well-formed signature the broadcaster rejects.
2. `avoNonce` is always **-1**. Nonces are non-sequential by design.
3. `salt` must be fresh random 32 bytes per transaction. Reused salts collide.
4. Up to 20 actions batch per transaction. Mints do not go in a batch.

Sequence: deposit USDC to the Avocado wallet on Base, `POST /v1/deposit` at `api.avcd.io`, sign the EIP-712 Cast message, `POST /v1/broadcast`, then poll `GET /v1/transaction/:hash`. Do not report success before confirmation.

| Contract | Address (Base 8453) |
|---|---|
| AvocadoBroadcaster | `0x0A6E5E7ae08896B0286441367843f4cA59D04dEf` |
| AvoFactory | `0xe981E50c7c47F0Df8826B5ce3F533f5E4440e687` |
| USDC | `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913` |

Reference: https://avcd.io/skill.md

## Fees

| Action | ETH |
|---|---|
| Mint Delaware LLC | 0.05 |
| Mint Series LLC (parent) | 0.05 |
| Mint Series Designation | 0.02 |
| Mint DAO Charter | 0.05 |
| Amendment | 0.01 |
| Transfer | gas only |
| Dissolution | 0.005 |

20% of fees route to the protocol treasury for legal template maintenance. Quote in ETH. If asked to convert, state the ETH price used.

## Document verification

The chain anchors the manifest, not each document. `primaryDocArweaveTx` is a storage pointer, not a digest. Verification is two steps:

1. Fetch the manifest at `primaryDocArweaveTx`.
2. For each entry in `documents`, fetch by `arweave_tx`, compute sha256 of the bytes, compare to the entry's `sha256` field.

A mismatch means a document was replaced after minting and no longer matches the record the parties agreed to. Amendment history lives in `amendmentHashes`; walk it in order to reconstruct prior versions, which stay retrievable on Arweave.

## Out of scope

This protocol forms entities. It does not give legal advice, does not opine on tax treatment or securities characterization, and does not decide whether an arrangement should be an entity at all. When the question is whether rather than how, say so and route the user to counsel.

---

AgentCorp is infrastructure, not legal advice. Consult qualified counsel for material transactions.
