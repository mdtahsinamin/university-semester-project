import Contact from "../../assets/5124556.jpg";
import SHIPPING from "../../assets/freeShipping.jpg";
import Gift from "../../assets/giftcard.jpg";
import Return from "../../assets/Money.jpg";
import FeatureCard from "./FeatureCard";

const Feature = () => {
  const featureData = [
    {
      id: 1,
      title: "FREE SHIPPING",
      descriptions: "Free worldwide shipping on all orders.",
      images: SHIPPING
    },
    {
      id: 2,
      title: "30 DAYS RETURN",
      descriptions: "No question return and easy refund in 14 days.",
      images: Return
    },
    {
      id: 3,
      title: "GIFT CARDS",
      descriptions: "Buy gift cards and use coupon codes easily.",
      images: Gift
    },
    {
      id: 4,
      title: "CONTACT US!",
      descriptions: "Keep in touch via email and support system.",
      images: Contact
    }
  ];

  return (
    <div className="container offset-1 mt-1">
      <div className="row">
        {featureData.map((feature) => {
          return <FeatureCard key={feature.id} feature={feature}></FeatureCard>;
        })}
      </div>
    </div>
  );
};

export default Feature;
