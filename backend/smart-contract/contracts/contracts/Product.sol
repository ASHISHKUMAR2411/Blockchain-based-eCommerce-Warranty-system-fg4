// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Product is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint deployDate;
    // uint256 tk;
    constructor() ERC721("Product", "PDT") {
        // uint256 tokenId = id;
        // _safeMint(from, tokenId);
        // _transfer()
    }
    function WarrantyPeriod(address to, uint256 _tokenId) public {
        if (block.timestamp >= deployDate){
            emit Transfer(to, address(0), _tokenId);
        }
    }

    function safeMint(address to,address from, string memory uri) public onlyOwner returns (string memory) {
        uint tokenId = block.timestamp;
        _mint(from, tokenId);
        _setTokenURI(tokenId, uri);
        _transfer(from, to ,tokenId);
        // payable(from).transfer(0.0001 ether);
        transferOwnership(to);
        return Strings.toString(tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}

    // for refund
    // function refund(address _to, uint256 _tokenId, uint256 _price) public payable {
    //     require(address(this).balance > _price, "not enough balance to refund");
    //     payable(_to).transfer(_price);
    //     // Now delete the nft from the blockchain network
    //     _burn(_tokenId);
    // }