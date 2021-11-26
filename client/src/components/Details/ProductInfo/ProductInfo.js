import { useState, useEffect } from "react";
import {
  Row,
  Tabs,
  Tab,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { wishProduct } from "../../../services/productData";
import Helmet from "react-helmet"

function ProductInfo({ params }) {
  const [wish, setWish] = useState(false);

  useEffect(() => {
    if (params.isWished === true) {
      setWish(true);
    } else {
      setWish(false);
    }
  }, [params.isWished, setWish]);

  const onHearthClick = () => {
    if (wish === false) {
      wishProduct(params._id)
        .then((res) => {
          setWish(true);
        })
        .catch((err) => console.log(err));
    } else {
      wishProduct(params._id)
        .then((res) => {
          setWish(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
            {/* <Helmet>
                <script async src="https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.js"></script>
                <div id="snipcart" data-config-modal-style="side" data-api-key="ZTI5ZGYwMmYtMTQxNS00ZmYzLTk5ODEtYjYxZjU4YzRhZDE4NjM3NzM0NTk5MDA1ODIzMjkz" hidden></div>
                <link rel="preconnect" href="https://app.snipcart.com" />
                <link rel="preconnect" href="https://cdn.snipcart.com" />
                <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.3.0/default/snipcart.css" />
            </Helmet> */}
      <Image className="col-lg-12" src={params.image} rounded />
      <Row>
        <h1 className="col-lg-10 col-sm-10 product-info-heading">
          {params.title}
        </h1>
        <span
          id="heartIconDetails"
          className="col-lg-1 col-sm-1"
          onClick={onHearthClick}
        >
          {params.isAuth && (
            <>
              {!wish ? (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Add to Wishlist</Tooltip>}
                >
                  <BsHeart />
                </OverlayTrigger>
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Remove from Wishlist</Tooltip>}
                >
                  <BsHeartFill />
                </OverlayTrigger>
              )}
            </>
          )}
        </span>
      </Row>
      <button className="snipcart-add-item" data-item-id={params._id}>
            Add to Cart
      </button>
      <div id="detailsCardText" className="col-lg-12">
        <Tabs defaultActiveKey="details" transition={false}>
          <Tab eventKey="details" title="Details" id="tab-details">
            {params.description}
            <hr />
            <p id="details-footer" className="text-muted">
              Product listed at {params.addedAt}
            </p>
          </Tab>
          {/* <Tab eventKey="aboutSeller" title="About seller">
                        <p>Name: {params.name || "Not specified"}</p>
                        <p>Email: {params.email}</p>
                        <p>Telephone: {params.phone}</p>
                        <p>City: {params.city}</p>
                    </Tab> */}
        </Tabs>
      </div>
    </>
  );
}

export default ProductInfo;
