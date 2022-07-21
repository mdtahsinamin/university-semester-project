import "./Feature.css";
const FeatureCard = ({ feature }) => {
  const { title, descriptions, images } = feature;
  return (
    <div className="col-md-3 mt-5 feature-card ">
      <div className="feature-contain">
        {
          <img
            className="img-fluid rounded-circle mb-2 feature-img"
            src={images}
            alt=""
            width="100"
          />
        }
      </div>
      <h5 className="text-primary text-center">{title}</h5>
      <p className="text-secondary text-center">{descriptions}</p>
    </div>
  );
};

export default FeatureCard;
