// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Product is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    uint deployDate;
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

    function safeMint(address to, string memory uri) public onlyOwner returns (uint256) {
        uint256 tokenId = block.timestamp;
        _mint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        _transfer(msg.sender, to ,tokenId);
        // payable(from).transfer(0.0001 ether);
        transferOwnership(to);
        return tokenId;
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