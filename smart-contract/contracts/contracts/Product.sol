// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
// @custom:security-contact email@gmail.com
contract Product is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    // we have to get rid of this Counter once we create our nfts decaying
    using Counters for Counters.Counter;
    // we can set the product prize by default, but we more will pass inside the safemint function
    // uint256 public productPrize = 0.01 ether;
    Counters.Counter private _tokenIdCounter;
    uint deployDate;
    constructor() ERC721("Product", "PDT") {
        // uint256 tokenId = id;
        // _safeMint(from, tokenId);
        // _transfer()
    }
 
    // function _baseURI() internal pure override returns (string memory) {
    //     return "https://ashish.com/";
    // }
 
    // to check the owner we have a builtin function in ERC721 which is ownerOf takes tokenId that is it will return the owner's address
     

//   constructor(){
//     deployDate = now;
//   }
    function WarrantyPeriod(address to, uint256 _tokenId) public {
        if (block.timestamp >= deployDate){
            emit Transfer(to, address(0), _tokenId);
        }
    }
   
    function safeMint(address from,address to, string memory tokenURI) public payable returns(uint256 tokenId) {
        // currently we need to change the tokenId and set it to the timestam i.e block.timestamp + warrantyPeriod
        // we require atleast the price of the product to be paid first before creating nft
        // for that -
        // require(address(this).balance > 0.0001 ether, "not enough balance to refund");
        // require(msg.value >= ethers /(10**18), "-1");
        // deployDate = block.timestamp + (12 * 30 days);
        // _tokenIdCounter.increment();
        uint256 tokenId = block.timestamp;
        _mint(from, tokenId);
        _transfer(from, to,tokenId);
        // payable(from).transfer(0.0001 ether);
        transferOwnership(to);
        // address to = msg.sender;
        // return tokenId;
        //  
        // 
        // here we transfer the autheticity of the product
        // before transfer we need to transfer the ether to the owner
        // withdraw(); which is a function written
        // 
        // or we can also use safeTransferFrom(from, to, tokenId)
    }
    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // for refund
    // function refund(address _to, uint256 _tokenId, uint256 _price) public payable {
    //     require(address(this).balance > _price, "not enough balance to refund");
    //     payable(_to).transfer(_price);
    //     // Now delete the nft from the blockchain network
    //     _burn(_tokenId);
    // }
}
