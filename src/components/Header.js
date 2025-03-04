import bgCafeLg from "../assets/bg-cafe-lg.jpg";
import bgCafeSm from "../assets/bg-cafe-sm.jpg";
import bgCafe from "../assets/bg-cafe.jpg";

const Header = () => {
  let bgImgSrcSet = `${bgCafeSm} 640w, ${bgCafe} 1280w, ${bgCafeLg} 1920w`;
  return (
    <>
      <header className="cafe-header bg-cafe">
        <img
          className="bg-cafe_image"
          src={bgCafeSm}
          // srcSet="small.jpg 500w, medium.jpg 1000w, large.jpg 2000w"
          // sizes="(max-width: 600px) 500px, (max-width: 1200px) 1000px, 2000px"
          srcSet={bgImgSrcSet}
          sizes="(max-width: 800px) 500px, (max-width: 1600px) 1000px, 1920px"
          alt="woman drinking coffee in cafe"
        />
      </header>
    </>
  );
};

export default Header;
