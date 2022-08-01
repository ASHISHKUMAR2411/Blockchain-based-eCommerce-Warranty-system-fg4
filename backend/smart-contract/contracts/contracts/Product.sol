// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// smart contract
contract Product is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {

    // to store the deployed contract address date
    uint deployDate;
    constructor() ERC721("Product", "PDT") {}

    // function to check the warranty
    function WarrantyPeriod(address to, uint256 _tokenId) public {
        // checking if the date crosses the warranty period
        if (block.timestamp >= deployDate){
            emit Transfer(to, address(0), _tokenId);
        }
    }

    // function for safeMint, ensure that token is transfered to the owner. And uri is a JSON which contains all the metadata of the product.
    function safeMint(address to,address from, string memory uri, uint months) public payable onlyOwner returns (string memory) {
        deployDate = block.timestamp + months;
        uint tokenId = block.timestamp;
        // internal function to mint nft
        _mint(from, tokenId);        
        _setTokenURI(tokenId, uri);
        // transfer nft to owner
        _transfer(from, to ,tokenId);
        // asking for payment
        payable(from).transfer(0.0001 ether);
        // transfer ownership
        transferOwnership(to);
        return Strings.toString(tokenId);
    }

    // function used in case of refund 
    function refund(address _to, uint256 _tokenId, uint256 _price) public payable {
        require(address(this).balance > _price, "not enough balance to refund");
        payable(_to).transfer(_price);
        // Now delete the nft from the blockchain network
        _burn(_tokenId);
    }

    // function to burn the nft
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    // function to set tokenURI on tokenID
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    // internal function overrides on transfer 
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }
    

    // function for upgradeability i.e Uses more complex proxy with higher overhead, requires less changes in your contract
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721Upgradeable, ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
