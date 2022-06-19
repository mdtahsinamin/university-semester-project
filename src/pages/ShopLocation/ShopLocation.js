import WorkingMap from './../../components/Map/WorkingMap';
import "./ShopLocation.css";
const ShopLocation = () => {
  return (
    <>
      <div className="content">
        <div className="container">
          <h2 className='text-center text-white contact-us'>Contact Us</h2>
          <div className="row align-items-stretch no-gutters contact-wrap">
            <div className="col-md-6">
              <div className="form">
                <h3>Send us a message</h3>
                <form>
                  <div className="row">
                    <div className="col-md-6 form-group mb-5">
                      <label htmlFor="" className="col-form-label">
                        Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="col-md-6 form-group mb-5">
                      <label htmlFor="" className="col-form-label">
                        Email *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 form-group mb-5">
                      <label htmlFor="" className="col-form-label">
                        Phone
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        id="phone"
                        placeholder="Phone #"
                      />
                    </div>
                    <div className="col-md-6 form-group mb-5">
                      <label htmlFor="" className="col-form-label">
                        Company
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="company"
                        id="company"
                        placeholder="Company  name"
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 form-group mb-5">
                      <label htmlFor="message" className="col-form-label">
                        Message *
                      </label>
                      <textarea
                        className="form-control"
                        name="message"
                        id="message"
                        cols="30"
                        rows="4"
                        placeholder="Write your message"></textarea>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 form-group">
                      <input
                        type="submit"
                        value="Send Message"
                        className="submit-form rounded-0 py-2 px-4"
                      />
                      <span className="submitting"></span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-md-6">
               <WorkingMap></WorkingMap>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopLocation;

/*
div className='container offset-1 mt-2 contact-us'>
           <div className="row">
               <div className="col-md-6 map-layout">
                  <WorkingMap></WorkingMap>
              </div> 
              <div className="col-md-6">
                    <h2>Contact Us</h2>
              </div> 
            </div>
        </div>

*/
