// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

/// @author Sammy Wise

// ======= External imports =====
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "hardhat/console.sol";

// ==== Internal imports ======
import "./FantomWorldStorage.sol";
import "./FantomHomes.sol";

error Marketplace_InvalidEndTimeStamp();
error Marketplace_NotOwnerOfToken();
error Marketplace_ListingExpired();
error Marketplace_CannotUpdateNonListedToken();
error Marketplace_InvalidListing();
error Marketplace_NotListingCreator();
error Marketplace_NotWithinSaleWindow();

contract Marketplace is IDirectListings {
    address nativeTokenWrapper;

    /// @dev Checks wheter a listing exists.
    modifier onlyExistingListing(uint256 _listingId) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        if (
            data.listings[_listingId].status != IDirectListings.Status.CREATED
        ) {
            revert Marketplace_InvalidListing();
        }
        _;
    }

    /// @dev Checks whether caller is a listing creator.
    modifier onlyListingCreator(uint256 _listingId, address creator) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        if (data.listings[_listingId].listingCreator != creator) {
            revert Marketplace_NotListingCreator();
        }
        _;
    }

    constructor() {}

    /**
     * @notice List NFTs (ERC721) for sale at a fixed price
     */

    function createListing(
        ListingParameters calldata _params
    ) external returns (uint256 listingId) {
        listingId = _getNextListingId();
        address listingCreator = msg.sender;
        uint128 startime = _params.startTimestamp;
        uint128 endtime = _params.endTimestamp;

        // require(endtime > startime, "Marketplace: Invalid endtime");
        if (endtime <= startime) {
            revert Marketplace_InvalidEndTimeStamp();
        }

        if (startime < block.timestamp) {
            require(
                startime + 60 minutes >= block.timestamp,
                "Marketplace: invalid startTimestamp."
            );

            startime = uint128(block.timestamp);
            endtime = endtime == type(uint128).max
                ? endtime
                : startime + (_params.endTimestamp - _params.startTimestamp);
        }

        _validateNewListing(_params, listingCreator);

        Listing memory listing = Listing({
            listingId: listingId,
            listingCreator: payable(listingCreator),
            assetContract: _params.assetContract,
            tokenId: _params.tokenId,
            pricePerToken: _params.pricePerToken,
            startTimestamp: startime,
            endTimestamp: endtime,
            reserved: _params.reserved,
            status: IDirectListings.Status.CREATED
        });

        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        data.listings[listingId] = listing;

        emit NewListing(
            listingCreator,
            listingId,
            _params.assetContract,
            listing
        );
    }

    /// @notice Update parameters of a listing of NFTs.
    function updateListing(
        uint256 _listingId,
        ListingParameters memory _params
    )
        external
        onlyExistingListing(_listingId)
        onlyListingCreator(_listingId, msg.sender)
    {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        address listingCreator = msg.sender;
        Listing memory listing = data.listings[_listingId];

        if (listing.endTimestamp < block.timestamp) {
            revert Marketplace_ListingExpired();
        }

        if (
            listing.assetContract != _params.assetContract ||
            listing.tokenId != _params.tokenId
        ) {
            revert Marketplace_CannotUpdateNonListedToken();
        }
        uint128 startTime = _params.startTimestamp;
        uint128 endTime = _params.endTimestamp;

        if (startTime >= endTime) {
            revert Marketplace_InvalidEndTimeStamp();
        }
        // require(
        //     listing.startTimestamp > block.timestamp ||
        //         (startTime == listing.startTimestamp &&
        //             endTime > block.timestamp),
        //     "Marketplace: listing already active."
        // );
        if (
            startTime != listing.startTimestamp && startTime < block.timestamp
        ) {
            require(
                startTime + 60 minutes >= block.timestamp,
                "Marketplace: invalid startTimestamp."
            );

            startTime = uint128(block.timestamp);

            endTime = endTime == listing.endTimestamp ||
                endTime == type(uint128).max
                ? endTime
                : startTime + (_params.endTimestamp - _params.startTimestamp);
        }

        _validateNewListing(_params, listingCreator);

        listing = Listing({
            listingId: _listingId,
            listingCreator: listingCreator,
            assetContract: _params.assetContract,
            tokenId: _params.tokenId,
            pricePerToken: _params.pricePerToken,
            startTimestamp: startTime,
            endTimestamp: endTime,
            reserved: _params.reserved,
            status: IDirectListings.Status.CREATED
        });

        data.listings[_listingId] = listing;

        emit UpdatedListing(
            listingCreator,
            _listingId,
            _params.assetContract,
            listing
        );
    }

    /// @notice Cancel a listing.
    function cancelListing(
        uint256 _listingId
    )
        external
        onlyExistingListing(_listingId)
        onlyListingCreator(_listingId, msg.sender)
    {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        data.listings[_listingId].status = IDirectListings.Status.CANCELLED;
        emit CancelledListing(msg.sender, _listingId);
    }

    /// @notice Buy NFTs from a listing.
    function buyFromListing(
        uint256 _listingId
    ) external payable onlyExistingListing(_listingId) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        Listing memory listing = data.listings[_listingId];

        if (
            listing.endTimestamp < block.timestamp ||
            block.timestamp >= listing.startTimestamp
        ) {
            revert Marketplace_NotWithinSaleWindow();
        }

        require(
            _validateOwnershipAndApproval(
                listing.listingCreator,
                listing.assetContract,
                listing.tokenId
            ),
            "Marketplace: not owner or approved tokens."
        );

        _payout(listing);
        _transferListingTokens(listing.listingCreator, msg.sender, listing);
    }

    /**
     * ///////////////////////////////////////////////////////
     *                           View Functions
     * //////////////////////////////////////////////////
     */

    /**
     * @notice Returns the total number of listings created.
     * @dev At any point, ther return value is the Id of the next listing created
     */

    function totalListings() external view returns (uint256) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();
        return data.totalListings;
    }

    /// @notice Returns all non-cancelled listings.
    function getAllListings(
        uint _startId,
        uint _endId
    ) external view returns (Listing[] memory _allListings) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        require(
            _startId <= _endId && _endId < data.totalListings,
            "invalid range"
        );

        _allListings = new Listing[](_endId - _startId + 1);

        for (uint256 i = _startId; i <= _endId; i += 1) {
            _allListings[i - _startId] = data.listings[i];
        }
    }

    /**
     *  @notice Returns all valid listings between the start and end Id (both inclusive) provided.
     *          A valid listing is where the listing creator still owns and has approved Marketplace
     *          to transfer the listed NFTs.
     */
    function getAllValidListings(
        uint256 _startId,
        uint256 _endId
    ) external view returns (Listing[] memory _validListings) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        require(
            _startId <= _endId && _endId < data.totalListings,
            "invalid range"
        );

        Listing[] memory _listings = new Listing[](_endId - _startId + 1);
        uint256 _listingCount;

        for (uint256 i = _startId; i <= _endId; i += 1) {
            _listings[i - _startId] = data.listings[i];
            if (_validateExistingListing(_listings[i - _startId])) {
                _listingCount += 1;
            }
        }

        _validListings = new Listing[](_listingCount);
        uint256 index = 0;
        uint256 count = _listings.length;
        for (uint256 i = 0; i < count; i += 1) {
            if (_validateExistingListing(_listings[i])) {
                _validListings[index++] = _listings[i];
            }
        }
    }

    /// @notice Returns a listing at a particular listing ID.
    function getListing(
        uint256 _listingId
    ) external view returns (Listing memory listing) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        listing = data.listings[_listingId];
    }

    /// @dev Pays out stakeholders in a sale.
    function _payout(Listing memory _listing) internal {
        FantomHomes nftContract = FantomHomes(_listing.assetContract);

        (address royalTyFeeRecipient, uint256 fee) = nftContract.royaltyInfo(
            _listing.tokenId,
            _listing.pricePerToken
        );
        require(fee > 0, "Invalid fee amount");

        // Perform all checks and computations before performing transfers
        // ...

        // Prepare the transfer amounts
        uint256 feeToArtist = fee;
        uint256 paymentToLister = _listing.pricePerToken - feeToArtist;

        // Update state to reflect the transfer
        _listing.status = IDirectListings.Status.SOLD;
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();
        data.listings[_listing.listingId] = _listing;

        // Perform the external transfers as the last step
        (bool successArtist, ) = payable(royalTyFeeRecipient).call{
            value: feeToArtist
        }("");
        require(successArtist, "Unable to send fee to artist");

        (bool successLister, ) = _listing.listingCreator.call{
            value: paymentToLister
        }("");
        require(successLister, "Unable to send payment to lister");
    }

    /// @dev Transfers tokens listed for sale in a direct listing

    function _transferListingTokens(
        address _from,
        address _to,
        Listing memory _listing
    ) internal {
        IERC721(_listing.assetContract).safeTransferFrom(
            _from,
            _to,
            _listing.tokenId,
            ""
        );
    }

    /**
     * @dev Returns the next listing id.
     */

    function _getNextListingId() internal returns (uint256 id) {
        DirectListingsStorage.Data storage data = DirectListingsStorage
            .directListingsStorage();

        id = data.totalListings;
        data.totalListings += 1;
    }

    /// @dev Checks whether the listing creator owns and has approved marketplace to transfer listed tokens
    function _validateNewListing(
        ListingParameters memory _params,
        address _tokenOwner
    ) internal view {
        if (
            !_validateOwnershipAndApproval(
                _tokenOwner,
                _params.assetContract,
                _params.tokenId
            )
        ) {
            revert Marketplace_NotOwnerOfToken();
        }
    }

    /// @dev Validates that `_tokenOwner` owns and has approved Marketplace to transfer NFTs.
    function _validateOwnershipAndApproval(
        address _tokenOwner,
        address _assetContract,
        uint256 _tokenId
    ) internal view returns (bool isValid) {
        address market = address(this);
        isValid =
            IERC721(_assetContract).ownerOf(_tokenId) == _tokenOwner &&
            (IERC721(_assetContract).getApproved(_tokenId) == market ||
                IERC721(_assetContract).isApprovedForAll(_tokenOwner, market));
        // console.log(IERC721(_assetContract).getApproved(_tokenId));
    }

    /// @dev Checks whether the listing exists, is active, and if the lister has sufficient balance.
    function _validateExistingListing(
        Listing memory _targetListing
    ) internal view returns (bool isValid) {
        isValid =
            _targetListing.startTimestamp <= block.timestamp &&
            _targetListing.endTimestamp > block.timestamp &&
            _targetListing.status == IDirectListings.Status.CREATED &&
            _validateOwnershipAndApproval(
                _targetListing.listingCreator,
                _targetListing.assetContract,
                _targetListing.tokenId
            );
    }
}
