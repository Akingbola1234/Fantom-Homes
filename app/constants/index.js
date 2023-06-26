export const FantomHomesAddress = "0x287B435A15F093E61415d7D020647AceEebdA19f"
export const FantomHomesAbi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256",
            },
        ],
        name: "BatchMetadataUpdate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
        ],
        name: "MetadataUpdate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "artist",
                type: "address",
            },
            {
                internalType: "uint96",
                name: "_royaltyFee",
                type: "uint96",
            },
            {
                internalType: "string",
                name: "metadataURI",
                type: "string",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "salePrice",
                type: "uint256",
            },
        ],
        name: "royaltyInfo",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

export const FantomAcc = "0x1fF189199e1419Be8eb153FC5Fdc6Aa4f2Cc87db"

export const FantomAccAbi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "approved",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Approval",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "ApprovalForAll",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_fromTokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "_toTokenId",
                type: "uint256",
            },
        ],
        name: "BatchMetadataUpdate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "_tokenId",
                type: "uint256",
            },
        ],
        name: "MetadataUpdate",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "Transfer",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "getApproved",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
        ],
        name: "isApprovedForAll",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "artist",
                type: "address",
            },
            {
                internalType: "uint96",
                name: "_royaltyFee",
                type: "uint96",
            },
            {
                internalType: "string",
                name: "metadataURI",
                type: "string",
            },
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [],
        name: "name",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "ownerOf",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "salePrice",
                type: "uint256",
            },
        ],
        name: "royaltyInfo",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "safeTransferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "operator",
                type: "address",
            },
            {
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "bytes4",
                name: "interfaceId",
                type: "bytes4",
            },
        ],
        name: "supportsInterface",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "symbol",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "owner",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "index",
                type: "uint256",
            },
        ],
        name: "tokenOfOwnerByIndex",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "tokenURI",
        outputs: [
            {
                internalType: "string",
                name: "",
                type: "string",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalSupply",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "from",
                type: "address",
            },
            {
                internalType: "address",
                name: "to",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
        ],
        name: "transferFrom",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

export const Marketplace = "0xe1434ef5aD3C269F69d6819ee7E8d30AfA57c247"
export const MarketplaceAbi = [
    {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        inputs: [],
        name: "Marketplace_CannotUpdateNonListedToken",
        type: "error",
    },
    {
        inputs: [],
        name: "Marketplace_InvalidEndTimeStamp",
        type: "error",
    },
    {
        inputs: [],
        name: "Marketplace_InvalidListing",
        type: "error",
    },
    {
        inputs: [],
        name: "Marketplace_ListingExpired",
        type: "error",
    },
    {
        inputs: [],
        name: "Marketplace_NotListingCreator",
        type: "error",
    },
    {
        inputs: [],
        name: "Marketplace_NotOwnerOfToken",
        type: "error",
    },
    {
        inputs: [],
        name: "Marketplace_NotWithinSaleWindow",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "bool",
                name: "approved",
                type: "bool",
            },
        ],
        name: "BuyerApprovedForListing",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "listingCreator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
        ],
        name: "CancelledListing",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "currency",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "pricePerToken",
                type: "uint256",
            },
        ],
        name: "CurrencyApprovedForListing",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "listingCreator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "assetContract",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "listingId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "listingCreator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                    {
                        internalType: "enum IDirectListings.Status",
                        name: "status",
                        type: "uint8",
                    },
                ],
                indexed: false,
                internalType: "struct IDirectListings.Listing",
                name: "listing",
                type: "tuple",
            },
        ],
        name: "NewListing",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "listingCreator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "assetContract",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "tokenId",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "address",
                name: "buyer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "quantityBought",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "totalPricePaid",
                type: "uint256",
            },
        ],
        name: "NewSale",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "listingCreator",
                type: "address",
            },
            {
                indexed: true,
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
            {
                indexed: true,
                internalType: "address",
                name: "assetContract",
                type: "address",
            },
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "listingId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "listingCreator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                    {
                        internalType: "enum IDirectListings.Status",
                        name: "status",
                        type: "uint8",
                    },
                ],
                indexed: false,
                internalType: "struct IDirectListings.Listing",
                name: "listing",
                type: "tuple",
            },
        ],
        name: "UpdatedListing",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_listingId",
                type: "uint256",
            },
        ],
        name: "buyFromListing",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_listingId",
                type: "uint256",
            },
        ],
        name: "cancelListing",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                components: [
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "quantity",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                ],
                internalType: "struct IDirectListings.ListingParameters",
                name: "_params",
                type: "tuple",
            },
        ],
        name: "createListing",
        outputs: [
            {
                internalType: "uint256",
                name: "listingId",
                type: "uint256",
            },
        ],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_startId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_endId",
                type: "uint256",
            },
        ],
        name: "getAllListings",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "listingId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "listingCreator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                    {
                        internalType: "enum IDirectListings.Status",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct IDirectListings.Listing[]",
                name: "_allListings",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_startId",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "_endId",
                type: "uint256",
            },
        ],
        name: "getAllValidListings",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "listingId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "listingCreator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                    {
                        internalType: "enum IDirectListings.Status",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct IDirectListings.Listing[]",
                name: "_validListings",
                type: "tuple[]",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_listingId",
                type: "uint256",
            },
        ],
        name: "getListing",
        outputs: [
            {
                components: [
                    {
                        internalType: "uint256",
                        name: "listingId",
                        type: "uint256",
                    },
                    {
                        internalType: "address",
                        name: "listingCreator",
                        type: "address",
                    },
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                    {
                        internalType: "enum IDirectListings.Status",
                        name: "status",
                        type: "uint8",
                    },
                ],
                internalType: "struct IDirectListings.Listing",
                name: "listing",
                type: "tuple",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "totalListings",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_listingId",
                type: "uint256",
            },
            {
                components: [
                    {
                        internalType: "address",
                        name: "assetContract",
                        type: "address",
                    },
                    {
                        internalType: "uint256",
                        name: "tokenId",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "quantity",
                        type: "uint256",
                    },
                    {
                        internalType: "uint256",
                        name: "pricePerToken",
                        type: "uint256",
                    },
                    {
                        internalType: "uint128",
                        name: "startTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "uint128",
                        name: "endTimestamp",
                        type: "uint128",
                    },
                    {
                        internalType: "bool",
                        name: "reserved",
                        type: "bool",
                    },
                ],
                internalType: "struct IDirectListings.ListingParameters",
                name: "_params",
                type: "tuple",
            },
        ],
        name: "updateListing",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]
