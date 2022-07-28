import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import Navbar from "../components/Navbar";

import "../styles/HomePage.css";
// import HomeBanner from "../components/header/HomeBanner";
import ProductRow from "../components/product/ProductRow";
import Footer from "../components/footer/Footer";

const useStyles = makeStyles({
  homePage: {
    marginTop: 60,
  },
});

function HomePage() {
  const classes = useStyles();
  
  return (
    // <div>
    //   <h2>
    //     Lorem ipsum dolor, sit amet consectetur adipisicing elit. Similique eum, iure provident non aperiam illum modi possimus expedita quidem atque voluptas adipisci iusto voluptate et necessitatibus consequuntur! Error corporis voluptatum odio sed ea ut. Alias minima perferendis itaque pariatur inventore excepturi, exercitationem facere necessitatibus saepe possimus magni ea quas aperiam quos perspiciatis maiores natus minus ex nulla sunt ipsam totam doloremque cupiditate vitae! Corrupti voluptas neque id, hic non impedit nisi dolorum minus quisquam at natus repellendus molestiae temporibus nobis blanditiis velit eum quidem in fugit illo commodi aspernatur qui placeat. Quidem, dolorem debitis voluptatibus nihil assumenda repellat recusandae unde.
    //   </h2>

    //   <img src="http://localhost:3001/images/anurag.jpg" alt="No Image" />
    // </div>
    <Box className={classes.homePage}>
      <Navbar />
      {/* <img src="http://localhost:3001/images/anurag.jpg" alt="No Image" /> */}
      <ProductRow
        // isFirstRow={true}
        categoryName="phone"
        title="Mobile"
        subTitle="Deals Refresh Every 24 Hours"
      />
      <ProductRow
        // isFirstRow={true}
        categoryName="laptop"
        title="Laptop"
        subTitle="Deals Refresh Every 24 Hours"
      />
      <ProductRow
        title="Top Deals"
        categoryName="phone"
        subTitle="Daily crazy deals"
      />
      <Footer />
    </Box>
  );
}
export default HomePage;

// import React from "react";

// import { Box, makeStyles } from "@material-ui/core";


// import HomeBanner from "../components/header/HomeBanner";
// import PosterRow from "../components/PosterRow";
// import FeaturedBrandsRow from "../components/FeaturedBrandsRow";
// import ProductRow from "../components/product/ProductRow";
// import "react-toastify/dist/ReactToastify.min.css";

// const useStyles = makeStyles({
//   homePage: {
//     marginTop: 60,
//   },
// });
// function HomePage() {
//   const classes = useStyles();
  
//   return (
//     <Box className={classes.homePage}>
//       <Navbar />
//       <HomeBanner />
//       <div className="first_productRow">
//         <ProductRow
//           isFirstRow={true}
//           categoryName="top offers"
//           title="Top Offers"
//           subTitle="Deals Refresh Every 24 Hours"
//         />
//         <div style={{ padding: 1, backgroundColor: "#ffffff", cursor:"pointer" }}>
//           <img
//             src={sidePosterLink}
//             alt="Ads"
//             className="ads_banner"
//           />
//         </div>
//       </div>
//       {/* <PosterRow
//         imgUrls={posterLinks.links1}
//       /> */}
//       <PosterRow
//         imgUrls={posterLinks.links2}
//       />
//       <ProductRow
//         title="Top Deals"
//         categoryName="top deals"
//         subTitle="Daily crazy deals"
//       />
//       <PosterRow
//         imgUrls={posterLinks.links3}
//       />
//       <ProductRow title="Mobiles" categoryName="mobile" />
//       <PosterRow
//         imgUrls={posterLinks.links4}
//       />
//       <FeaturedBrandsRow
//         brandsUrls={featuredBrandLinks.links1}
//       />
//       <ProductRow title="Electronics" categoryName="electronic" />
//       <PosterRow
//         imgUrls={posterLinks.links5}
//       />
//       <ProductRow title="Appliances" categoryName="appliances" />
//       <PosterRow
//         imgUrls={posterLinks.links6}
//       />
//       <FeaturedBrandsRow
//         brandsUrls={featuredBrandLinks.links2}
//       />
//       <ProductRow title="Furniture" categoryName="furniture" />
//       <Footer/>
//     </Box>
//   );
// }

// export default HomePage;
