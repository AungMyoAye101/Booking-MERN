import "./roomList.css";

const RoomList = () => {
  const list = [
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/spa-pool-sky-leisure-background_1203-4946.jpg?t=st=1739537710~exp=1739541310~hmac=422cd13ece996d0295ebf1d2af53809f31269de4f541577d495722e423c484c6&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Madrid",
      price: 120,
      rating: 4.5,
    },
    {
      url: "https://img.freepik.com/free-photo/colonial-style-house-night-scene_1150-17925.jpg?t=st=1739537537~exp=1739541137~hmac=4ea038e25fe4731404bfcdd8bc276c05b04c8e65c734e586c23ad03f815409e3&w=740",
      title: "Aparthotel Stare Miasto",
      city: "Austin",
      price: 120,
      rating: 4.5,
    },
  ];
  return (
    <section className="section-container">
      <h1 className="title">Homes guests love</h1>
      <div className="room-container">
        {list.map((item, i) => (
          <div key={i} className="room-card">
            <img src={item.url} alt={"photo of " + item.city} />
            <div className="content-container">
              <h1>{item.title}</h1>
              <h2>{item.city}</h2>
              <div className="justify-between">
                <div className="rating-container">
                  <div>{item.rating}</div>
                  <span>Excellent</span>
                </div>
                <p> ${item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RoomList;
