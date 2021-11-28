import React from "react";

const LandingPage = () => {


    const [data, setData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
          .then((res) => res.json())
          .then((data) => setData(data.message));
      }, []);
      

    return (
        <div className="home">
            <div class="container">
            <div class="row align-items-center my-5">
                <div class="col-lg-7">
                <img
                    class="img-fluid rounded mb-4 mb-lg-0"
                    src="http://placehold.it/900x400"
                    alt=""
                />
                </div>
                <div class="col-lg-5">
                <h1 class="font-weight-light">Home</h1>
                <p>
                City Explorer helps you find personalized things to do in your city.
                </p>
                <p>{!data ? "Loading..." : data}</p>
                </div>
            </div>
            </div>
        </div>
        );
    }
        
        export default LandingPage;