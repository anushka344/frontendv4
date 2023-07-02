import React, { useEffect } from 'react';
import './ui2.css';

function HomePage() {

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';
    document.head.appendChild(link);

    // Clean up the link element when the component is unmounted
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const divStyle = {
    backgroundImage: `url('https://www.w3schools.com/w3images/mac.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };


  return (
    <div>
      <div className="App"> 
      <>
        <title>home.CSS Template</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://www.homeschools.com/homecss/4/home.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Raleway"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        {/* Navbar (sit on top) */}
        
        {/* Header with full-height image */}
        <div className="dimen home-display-container home-grayscale-min" style={divStyle} id="home">
          <div className="home-display-left home-text-white"  style={{ padding: 48}}>
            <span className="home-jumbo home-hide-small">
            Streamline Your Inventory Management with Ease
            </span>
            <br />
            <span className="home-xxlarge home-hide-large home-hide-medium">
            Streamline Your Inventory Management with Ease.
            </span>
            <br />
            <span className="home-large">
            Unlock the power of seamless inventory management for optimal business growth
            </span>
            <p>
              <a
                href="#about"
                className="home-button home-white home-padding-large home-large home-margin-top home-opacity home-hover-opacity-off"
              >
                Get Started
              </a>
            </p>
          </div>
       
        </div>
        {/* About Section */}
        <div className="home-container" style={{ padding: "128px 16px" }} id="about">
          <h3 className="home-center">ABOUT </h3>
          <p className="home-center home-large">Key features of our software</p>
          <div className="home-row-padding home-center" style={{ marginTop: 64 }}>
            <div className="home-quarter">
              <i className="fa fa-desktop home-margin-bottom home-jumbo home-center" />
              <p className="home-large">Responsive</p>
              <p>
              Our inventory management system boasts a sleek and intuitive user interface, providing a seamless and enjoyable user experience
              </p>
            </div>
            <div className="home-quarter">
              <i className="fa fa-heart home-margin-bottom home-jumbo" />
              <p className="home-large">Manage Easily</p>
              <p>
              Effortlessly manage and track all aspects of your inventory, ensuring seamless stock updates and control
              </p>
            </div>
            <div className="home-quarter">
              <i className="fa fa-diamond home-margin-bottom home-jumbo" />
              <p className="home-large">Design</p>
              <p>
              User-friendly table designs that make it easy to view and organize data, enhancing the overall user experience
              </p>
            </div>
            <div className="home-quarter">
              <i className="fa fa-cog home-margin-bottom home-jumbo" />
              <p className="home-large">Support</p>
              <p>
                Reliable and accessible support, ensuring that you can reach out for assistance at any time
              </p>
            </div>
          </div>
        </div>

        <div className="home-container home-row home-center home-dark-grey home-padding-64">
          <div className="home-quarter">
            <span className="home-xxlarge">Manange</span>
            <br />
            Customers
          </div>
          <div className="home-quarter">
            <span className="home-xxlarge">Update</span>
            <br />
            Stocks
          </div>
          <div className="home-quarter">
            <span className="home-xxlarge">Track</span>
            <br />
            Products
          </div>
          <div className="home-quarter">
            <span className="home-xxlarge">Record</span>
            <br />
            Suppliers
          </div>
        </div>
        {/* Promo Section - "We know design" */}
        <div className="home-container home-light-grey" style={{ padding: "128px 16px" }}>
          <div className="home-row-padding">
            <div className="home-col m6">
              <h3>We know how to keep a track of your inhand,outhand products , suppliers, customers, units and many more</h3>
            
            </div>
            <div className="home-col m6">
              <img
                className="home-image home-round-large"
                src="https://www.w3schools.com/w3images/phone_buildings.jpg"
                alt="Buildings"
                width={700}
                height={394}
              />
            </div>
          </div>
        </div>
        {/* Team Section */}
        {/* Promo Section "Statistics" */}


        {/* Work Section */}

        {/* Modal for full size images on click*/}
        <div
          id="modal01"
          className="home-modal home-black"
          onclick="this.style.display='none'"
        >
          <span
            className="home-button home-xxlarge home-black home-padding-large home-display-topright"
            title="Close Modal Image"
          >
            ×
          </span>
          <div className="home-modal-content home-animate-zoom home-center home-transparent home-padding-64">
            <img id="img01" className="home-image" />
            <p id="caption" className="home-opacity home-large" />
          </div>
        </div>
        
        {/* Contact Section */}
        {/* Footer */}
        <footer className="home-center home-black home-padding-64">

        <h3 className="home-center">CONTACT</h3>
          <p className="home-center home-large">Lets get in touch. Send us a message:</p>
          <div style={{ marginTop: 48 }}>
            <p>
              <i className="fa fa-map-marker fa-fw home-xxlarge home-margin-right" />{" "}
              Kolkata , IND
            </p>
            <p>
              <i className="fa fa-phone fa-fw home-xxlarge home-margin-right" /> Phone:
              +91 1515151515
            </p>
            <p>
              <i className="fa fa-envelope fa-fw home-xxlarge home-margin-right"> </i>{" "}
              Email: mail@mail.com
            </p>
            <br />

          </div>


          <a href="/homePage" className="home-button home-light-grey">
            <i className="fa fa-arrow-up home-margin-right" />
            To the top
          </a>
        </footer>
      </>

    </div>
    </div>
  );
}

export default HomePage;
